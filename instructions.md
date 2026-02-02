# VibeTribe Implementation Instructions
## Detailed Technical Guide for Development Team

**Document Version:** 1.0  
**Target Audience:** Developers, Technical Leads  
**Project:** VibeTribe University Dating Portal

---

## 📑 Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Project Structure](#project-structure)
3. [Backend Implementation](#backend-implementation)
4. [Frontend Implementation](#frontend-implementation)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Matching Algorithm](#matching-algorithm)
8. [Real-time Features](#real-time-features)
9. [Authentication & Security](#authentication--security)
10. [Testing Strategy](#testing-strategy)
11. [Deployment Guide](#deployment-guide)
12. [Performance Optimization](#performance-optimization)

---

## 🛠️ Development Environment Setup

### Prerequisites

**Required Software:**
- Node.js 18+ (LTS version)
- Python 3.11+ (if using Python backend)
- PostgreSQL 15+
- Redis 7+
- Git
- Docker & Docker Compose
- VS Code or preferred IDE

**Package Managers:**
- npm or yarn (frontend)
- pip or poetry (Python backend)

### Initial Setup

```bash
# Clone repository
git clone https://github.com/your-org/vibetribe.git
cd vibetribe

# Install dependencies
cd backend
npm install  # or: pip install -r requirements.txt

cd ../mobile
npm install

cd ../web
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development databases
docker-compose up -d postgres redis

# Run migrations
npm run migrate  # or: python manage.py migrate

# Start development servers
npm run dev:backend  # Terminal 1
npm run dev:mobile   # Terminal 2
npm run dev:web      # Terminal 3
```

---

## 📁 Project Structure

```
vibetribe/
├── backend/                    # Backend API server
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Request handlers
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Express middleware
│   │   ├── utils/             # Helper functions
│   │   └── app.js             # App entry point
│   ├── tests/                 # Backend tests
│   ├── migrations/            # Database migrations
│   └── package.json
│
├── mobile/                     # React Native mobile app
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── screens/           # Screen components
│   │   ├── navigation/        # Navigation configuration
│   │   ├── services/          # API calls
│   │   ├── store/             # State management
│   │   ├── utils/             # Helper functions
│   │   ├── assets/            # Images, fonts
│   │   └── App.tsx            # App entry point
│   ├── ios/                   # iOS native code
│   ├── android/               # Android native code
│   └── package.json
│
├── web/                        # React web app (admin)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
│
├── shared/                     # Shared code/types
│   └── types/                 # TypeScript definitions
│
├── docker-compose.yml          # Local development
└── README.md
```

---

## 🔧 Backend Implementation

### Tech Stack
- **Framework:** Node.js with Express.js (or FastAPI with Python)
- **Database:** PostgreSQL
- **Cache:** Redis
- **ORM:** Prisma (Node) or SQLAlchemy (Python)
- **Real-time:** Socket.io
- **Authentication:** JWT + Refresh Tokens

### Setting Up Express Backend

```javascript
// backend/src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);

// Error handling
app.use(errorHandler);

// Socket.io for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join_chat', (chatId) => {
    socket.join(`chat_${chatId}`);
  });
  
  socket.on('send_message', async (data) => {
    // Handle message sending
    io.to(`chat_${data.chatId}`).emit('new_message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

export { app, httpServer, io };
```

### Controllers Pattern

```javascript
// backend/src/controllers/userController.js
import { userService } from '../services/userService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const userController = {
  // Get user profile
  getProfile: asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const profile = await userService.getProfile(userId);
    
    res.json({
      success: true,
      data: profile
    });
  }),

  // Update user profile
  updateProfile: asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const updates = req.body;
    
    const updatedProfile = await userService.updateProfile(userId, updates);
    
    res.json({
      success: true,
      data: updatedProfile
    });
  }),

  // Upload profile photos
  uploadPhotos: asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const files = req.files;
    
    const photos = await userService.uploadPhotos(userId, files);
    
    res.json({
      success: true,
      data: photos
    });
  })
};
```

### Services Layer (Business Logic)

```javascript
// backend/src/services/userService.js
import { prisma } from '../config/database.js';
import { uploadToS3 } from '../utils/s3.js';
import { AppError } from '../utils/errors.js';

export const userService = {
  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        photos: true,
        interests: true,
        preferences: true
      }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  },

  async updateProfile(userId, updates) {
    // Validate updates
    const allowedFields = ['bio', 'major', 'graduationYear', 'interests'];
    const filteredUpdates = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: filteredUpdates
    });

    return updatedUser;
  },

  async uploadPhotos(userId, files) {
    // Upload to S3
    const uploadPromises = files.map(file => 
      uploadToS3(file, `users/${userId}/photos`)
    );
    const uploadedUrls = await Promise.all(uploadPromises);

    // Save to database
    const photos = await prisma.photo.createMany({
      data: uploadedUrls.map((url, index) => ({
        userId,
        url,
        order: index
      }))
    });

    return photos;
  }
};
```

---

## 💾 Database Schema

### Prisma Schema

```prisma
// backend/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                String    @id @default(uuid())
  email             String    @unique
  emailVerified     Boolean   @default(false)
  passwordHash      String
  
  // Profile Info
  firstName         String
  lastName          String
  dateOfBirth       DateTime
  gender            Gender
  bio               String?   @db.Text
  
  // University Info
  universityId      String
  university        University @relation(fields: [universityId], references: [id])
  major             String
  graduationYear    Int
  studentIdVerified Boolean   @default(false)
  
  // Settings
  lookingFor        LookingFor @default(DATING)
  showAge           Boolean    @default(true)
  showDistance      Boolean    @default(true)
  
  // Location
  latitude          Float?
  longitude         Float?
  locationUpdatedAt DateTime?
  
  // Preferences
  preferences       Preferences?
  
  // Relations
  photos            Photo[]
  interests         Interest[]
  sentLikes         Like[]     @relation("SentLikes")
  receivedLikes     Like[]     @relation("ReceivedLikes")
  matches           Match[]    @relation("UserMatches")
  matchedWith       Match[]    @relation("MatchedWithUser")
  messages          Message[]
  stories           Story[]
  badges            UserBadge[]
  
  // Metadata
  createdAt         DateTime   @default(now())
  updatedAt         DateTime   @updatedAt
  lastActiveAt      DateTime   @default(now())
  isActive          Boolean    @default(true)
  isPremium         Boolean    @default(false)
  
  @@index([universityId])
  @@index([email])
}

model University {
  id          String   @id @default(uuid())
  name        String
  shortName   String
  emailDomain String   @unique
  city        String
  country     String
  latitude    Float
  longitude   Float
  users       User[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([emailDomain])
}

model Photo {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  url       String
  order     Int
  isMain    Boolean  @default(false)
  
  createdAt DateTime @default(now())
  
  @@index([userId])
}

model Interest {
  id        String   @id @default(uuid())
  name      String
  category  String
  emoji     String?
  users     User[]
  
  @@unique([name])
}

model Preferences {
  id             String   @id @default(uuid())
  userId         String   @unique
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Age range
  minAge         Int      @default(18)
  maxAge         Int      @default(30)
  
  // Distance
  maxDistance    Int      @default(50) // km
  
  // Gender preference
  showMen        Boolean  @default(true)
  showWomen      Boolean  @default(true)
  showNonBinary  Boolean  @default(true)
  
  // University
  sameUniversity Boolean  @default(false)
  
  updatedAt      DateTime @updatedAt
}

model Like {
  id          String    @id @default(uuid())
  fromUserId  String
  fromUser    User      @relation("SentLikes", fields: [fromUserId], references: [id], onDelete: Cascade)
  toUserId    String
  toUser      User      @relation("ReceivedLikes", fields: [toUserId], references: [id], onDelete: Cascade)
  
  createdAt   DateTime  @default(now())
  
  @@unique([fromUserId, toUserId])
  @@index([fromUserId])
  @@index([toUserId])
}

model Match {
  id          String    @id @default(uuid())
  user1Id     String
  user1       User      @relation("UserMatches", fields: [user1Id], references: [id], onDelete: Cascade)
  user2Id     String
  user2       User      @relation("MatchedWithUser", fields: [user2Id], references: [id], onDelete: Cascade)
  
  messages    Message[]
  
  // Engagement tracking
  lastMessageAt DateTime?
  messageCount  Int       @default(0)
  
  createdAt   DateTime  @default(now())
  
  @@unique([user1Id, user2Id])
  @@index([user1Id])
  @@index([user2Id])
}

model Message {
  id        String   @id @default(uuid())
  matchId   String
  match     Match    @relation(fields: [matchId], references: [id], onDelete: Cascade)
  
  senderId  String
  sender    User     @relation(fields: [senderId], references: [id], onDelete: Cascade)
  
  content   String   @db.Text
  type      MessageType @default(TEXT)
  mediaUrl  String?
  
  read      Boolean  @default(false)
  readAt    DateTime?
  
  createdAt DateTime @default(now())
  
  @@index([matchId])
  @@index([senderId])
}

model Story {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  mediaUrl  String
  type      StoryType
  caption   String?
  
  expiresAt DateTime
  createdAt DateTime @default(now())
  
  @@index([userId])
  @@index([expiresAt])
}

model VibeCheck {
  id        String   @id @default(uuid())
  userId    String
  vibe      String   // "coffee", "party", "study", "beach"
  date      DateTime @default(now())
  
  @@index([userId, date])
}

model UserBadge {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  badgeType String   // "verified", "top_profile", "early_adopter", etc.
  awardedAt DateTime @default(now())
  
  @@index([userId])
}

enum Gender {
  MALE
  FEMALE
  NON_BINARY
  OTHER
}

enum LookingFor {
  DATING
  FRIENDS
  NETWORKING
  OPEN
}

enum MessageType {
  TEXT
  IMAGE
  VOICE
  GIF
}

enum StoryType {
  IMAGE
  VIDEO
}
```

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --name init

# Apply migrations in production
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

---

## 🔌 API Endpoints

### Authentication Endpoints

```
POST   /api/v1/auth/signup
POST   /api/v1/auth/verify-email
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
```

**Example: Signup**

```javascript
// POST /api/v1/auth/signup
{
  "firstName": "Sarah",
  "lastName": "Khan",
  "email": "sarah.khan@student.aud.ac.ae",
  "password": "SecurePassword123!",
  "dateOfBirth": "2003-05-15",
  "gender": "FEMALE"
}

// Response
{
  "success": true,
  "message": "Verification email sent",
  "data": {
    "userId": "uuid-here",
    "email": "sarah.khan@student.aud.ac.ae"
  }
}
```

### User Endpoints

```
GET    /api/v1/users/me
PUT    /api/v1/users/me
POST   /api/v1/users/me/photos
DELETE /api/v1/users/me/photos/:photoId
PUT    /api/v1/users/me/photos/:photoId/reorder
GET    /api/v1/users/:userId/profile
PUT    /api/v1/users/me/preferences
GET    /api/v1/users/me/interests
PUT    /api/v1/users/me/interests
```

### Discovery Endpoints

```
GET    /api/v1/discovery/feed
POST   /api/v1/discovery/like/:userId
POST   /api/v1/discovery/pass/:userId
POST   /api/v1/discovery/super-like/:userId
GET    /api/v1/discovery/mutual-friends/:userId
```

**Example: Get Discovery Feed**

```javascript
// GET /api/v1/discovery/feed?limit=10

// Response
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "firstName": "Ahmed",
        "age": 22,
        "bio": "Engineering student who loves...",
        "photos": [
          { "url": "...", "order": 0 },
          { "url": "...", "order": 1 }
        ],
        "interests": ["Coffee", "Travel", "Tech"],
        "university": "AUD",
        "major": "Computer Science",
        "distance": 5.2,
        "compatibilityScore": 87,
        "mutualFriends": 3
      }
    ],
    "hasMore": true
  }
}
```

### Matching Endpoints

```
GET    /api/v1/matches
GET    /api/v1/matches/:matchId
DELETE /api/v1/matches/:matchId
POST   /api/v1/matches/:matchId/unmatch
POST   /api/v1/matches/:matchId/block
```

### Messaging Endpoints

```
GET    /api/v1/messages/conversations
GET    /api/v1/messages/:matchId
POST   /api/v1/messages/:matchId
PUT    /api/v1/messages/:messageId/read
POST   /api/v1/messages/:matchId/media
```

**Example: Send Message**

```javascript
// POST /api/v1/messages/:matchId
{
  "content": "Hey! How's it going?",
  "type": "TEXT"
}

// Response
{
  "success": true,
  "data": {
    "id": "msg-uuid",
    "matchId": "match-uuid",
    "senderId": "user-uuid",
    "content": "Hey! How's it going?",
    "type": "TEXT",
    "read": false,
    "createdAt": "2026-02-02T10:30:00Z"
  }
}
```

### Story Endpoints

```
GET    /api/v1/stories
POST   /api/v1/stories
DELETE /api/v1/stories/:storyId
GET    /api/v1/stories/user/:userId
```

### Feature Endpoints

```
POST   /api/v1/vibe-check
GET    /api/v1/vibe-check/today
GET    /api/v1/hot-spots
GET    /api/v1/campus-polls/active
POST   /api/v1/campus-polls/:pollId/vote
```

---

## 🧮 Matching Algorithm

### Algorithm Components

1. **Compatibility Score (0-100)**
   - Age compatibility: 15%
   - Distance compatibility: 10%
   - Interest overlap: 25%
   - Lifestyle alignment: 20%
   - Social circle proximity: 15%
   - Activity patterns: 10%
   - Daily vibe match: 5%

### Implementation

```javascript
// backend/src/services/matchingService.js

export const matchingService = {
  async calculateCompatibility(user1, user2) {
    let score = 0;

    // 1. Age Compatibility (15 points)
    const ageDiff = Math.abs(user1.age - user2.age);
    score += Math.max(0, 15 - ageDiff * 2);

    // 2. Distance Compatibility (10 points)
    const distance = calculateDistance(
      user1.latitude, user1.longitude,
      user2.latitude, user2.longitude
    );
    if (distance <= 5) score += 10;
    else if (distance <= 10) score += 7;
    else if (distance <= 20) score += 4;

    // 3. Interest Overlap (25 points)
    const user1Interests = new Set(user1.interests.map(i => i.id));
    const user2Interests = new Set(user2.interests.map(i => i.id));
    const commonInterests = [...user1Interests].filter(i => 
      user2Interests.has(i)
    );
    const interestScore = (commonInterests.length / Math.max(user1Interests.size, user2Interests.size)) * 25;
    score += interestScore;

    // 4. Lifestyle Alignment (20 points)
    const lifestyleScore = await calculateLifestyleScore(user1, user2);
    score += lifestyleScore;

    // 5. Social Circle Proximity (15 points)
    const mutualFriends = await getMutualFriendsCount(user1.id, user2.id);
    score += Math.min(mutualFriends * 3, 15);

    // 6. Activity Patterns (10 points)
    const activityScore = await calculateActivityPatternScore(user1, user2);
    score += activityScore;

    // 7. Daily Vibe Match (5 points)
    const vibeScore = await calculateVibeMatch(user1.id, user2.id);
    score += vibeScore;

    return Math.round(score);
  },

  async getDiscoveryFeed(userId, limit = 10) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { preferences: true, interests: true }
    });

    // Get users who match preferences
    const candidates = await prisma.user.findMany({
      where: {
        id: { not: userId },
        isActive: true,
        emailVerified: true,
        // Apply preference filters
        age: {
          gte: user.preferences.minAge,
          lte: user.preferences.maxAge
        },
        // Not already liked or matched
        receivedLikes: {
          none: { fromUserId: userId }
        }
      },
      include: {
        photos: true,
        interests: true,
        university: true
      },
      take: 50 // Get more candidates to rank
    });

    // Calculate compatibility scores
    const rankedCandidates = await Promise.all(
      candidates.map(async candidate => ({
        ...candidate,
        compatibilityScore: await this.calculateCompatibility(user, candidate),
        distance: calculateDistance(
          user.latitude, user.longitude,
          candidate.latitude, candidate.longitude
        ),
        mutualFriends: await getMutualFriendsCount(userId, candidate.id)
      }))
    );

    // Sort by compatibility score
    rankedCandidates.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    // Add randomness to top candidates (prevent always showing same order)
    const top20 = rankedCandidates.slice(0, 20);
    const shuffled = shuffleArray(top20);

    return shuffled.slice(0, limit);
  },

  async handleLike(fromUserId, toUserId) {
    // Create like
    const like = await prisma.like.create({
      data: {
        fromUserId,
        toUserId
      }
    });

    // Check if other user liked back (mutual like = match!)
    const mutualLike = await prisma.like.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId: toUserId,
          toUserId: fromUserId
        }
      }
    });

    if (mutualLike) {
      // Create match
      const match = await prisma.match.create({
        data: {
          user1Id: fromUserId,
          user2Id: toUserId
        }
      });

      // Send push notifications
      await notificationService.sendMatchNotification(fromUserId, toUserId);

      return { matched: true, matchId: match.id };
    }

    return { matched: false };
  }
};

// Helper functions
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(degrees) {
  return degrees * Math.PI / 180;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
```

---

## 📱 Frontend Implementation (React Native)

### Project Setup

```bash
# Create React Native project
npx react-native init VibeTribe --template react-native-template-typescript

# Install core dependencies
npm install @react-navigation/native @react-navigation/stack
npm install react-native-gesture-handler react-native-reanimated
npm install @tanstack/react-query axios
npm install zustand
npm install react-native-svg
npm install @react-native-async-storage/async-storage

# Install UI components
npm install react-native-paper
npm install react-native-linear-gradient
npm install react-native-swipe-cards

# For image handling
npm install react-native-image-picker
npm install react-native-fast-image

# For real-time
npm install socket.io-client

# For push notifications
npm install @react-native-firebase/messaging
```

### App Structure

```typescript
// mobile/src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigator from './navigation/RootNavigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}
```

### Navigation Setup

```typescript
// mobile/src/navigation/RootNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';

// Main App Screens
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
```

### State Management (Zustand)

```typescript
// mobile/src/store/authStore.ts
import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  
  setUser: (user) => set({ user }),
  
  setToken: async (token) => {
    if (token) {
      await AsyncStorage.setItem('auth_token', token);
    } else {
      await AsyncStorage.removeItem('auth_token');
    }
    set({ token });
  },
  
  logout: async () => {
    await AsyncStorage.removeItem('auth_token');
    set({ user: null, token: null });
  }
}));
```

### API Service

```typescript
// mobile/src/services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000/api/v1',
  timeout: 10000
});

// Request interceptor for auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, logout user
      await AsyncStorage.removeItem('auth_token');
      // Navigate to login
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Discovery Screen Example

```typescript
// mobile/src/screens/DiscoveryScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import SwipeCards from 'react-native-swipe-cards';
import ProfileCard from '../components/ProfileCard';
import { discoveryApi } from '../services/discoveryApi';

export default function DiscoveryScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { data: users, refetch } = useQuery({
    queryKey: ['discovery-feed'],
    queryFn: () => discoveryApi.getFeed()
  });

  const likeMutation = useMutation({
    mutationFn: (userId: string) => discoveryApi.like(userId),
    onSuccess: (data) => {
      if (data.matched) {
        // Show match animation
        showMatchModal(data.matchId);
      }
    }
  });

  const passMutation = useMutation({
    mutationFn: (userId: string) => discoveryApi.pass(userId)
  });

  const handleLike = (card: User) => {
    likeMutation.mutate(card.id);
  };

  const handlePass = (card: User) => {
    passMutation.mutate(card.id);
  };

  const handleMaybe = (card: User) => {
    // Skip for now, will show again later
  };

  return (
    <View style={styles.container}>
      <SwipeCards
        cards={users || []}
        renderCard={(cardData) => <ProfileCard user={cardData} />}
        handleYup={handleLike}
        handleNope={handlePass}
        handleMaybe={handleMaybe}
        hasMaybeAction
        cardRemoved={(index) => {
          setCurrentIndex(index + 1);
          if (index === users.length - 3) {
            refetch(); // Load more cards
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
});
```

---

## 🔐 Authentication & Security

### JWT Implementation

```javascript
// backend/src/utils/jwt.js
import jwt from 'jsonwebtoken';

export const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
```

### Auth Middleware

```javascript
// backend/src/middleware/auth.js
import { verifyToken } from '../utils/jwt.js';
import { AppError } from '../utils/errors.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      throw new AppError('No token provided', 401);
    }

    const decoded = verifyToken(token);
    req.user = { id: decoded.userId };
    
    next();
  } catch (error) {
    next(new AppError('Invalid token', 401));
  }
};
```

### Password Hashing

```javascript
// backend/src/utils/password.js
import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
```

---

## ⚡ Real-time Features (Socket.io)

### Socket Server Setup

```javascript
// backend/src/socket/index.js
import { io } from '../app.js';
import { verifyToken } from '../utils/jwt.js';

export const setupSocketServer = () => {
  io.use((socket, next) => {
    // Authenticate socket connection
    const token = socket.handshake.auth.token;
    try {
      const decoded = verifyToken(token);
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.userId} connected`);

    // Join user's personal room
    socket.join(`user_${socket.userId}`);

    // Handle typing indicators
    socket.on('typing_start', ({ matchId }) => {
      socket.to(`match_${matchId}`).emit('user_typing', {
        userId: socket.userId,
        matchId
      });
    });

    socket.on('typing_stop', ({ matchId }) => {
      socket.to(`match_${matchId}`).emit('user_stopped_typing', {
        userId: socket.userId,
        matchId
      });
    });

    // Handle real-time messages
    socket.on('send_message', async (data) => {
      const { matchId, content, type } = data;
      
      // Save message to database
      const message = await messageService.createMessage({
        matchId,
        senderId: socket.userId,
        content,
        type
      });

      // Send to recipient
      io.to(`match_${matchId}`).emit('new_message', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`);
    });
  });
};
```

### Socket Client (React Native)

```typescript
// mobile/src/services/socket.ts
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SocketService {
  private socket: any = null;

  async connect() {
    const token = await AsyncStorage.getItem('auth_token');
    
    this.socket = io(process.env.API_URL, {
      auth: { token }
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('new_message', (message) => {
      // Handle incoming message
      console.log('New message:', message);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(matchId: string, content: string) {
    this.socket.emit('send_message', {
      matchId,
      content,
      type: 'TEXT'
    });
  }

  joinMatch(matchId: string) {
    this.socket.emit('join_match', matchId);
  }

  leaveMatch(matchId: string) {
    this.socket.emit('leave_match', matchId);
  }
}

export default new SocketService();
```

---

## 🧪 Testing Strategy

### Backend Testing

```javascript
// backend/tests/auth.test.js
import request from 'supertest';
import { app } from '../src/app.js';
import { prisma } from '../src/config/database.js';

describe('Authentication', () => {
  beforeEach(async () => {
    // Clear test database
    await prisma.user.deleteMany();
  });

  describe('POST /api/v1/auth/signup', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@student.aud.ac.ae',
          password: 'Password123!',
          dateOfBirth: '2003-01-01',
          gender: 'MALE'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });

    it('should reject invalid email domain', async () => {
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'test@gmail.com',
          // ... other fields
        });

      expect(response.status).toBe(400);
    });
  });
});
```

### Frontend Testing (Jest + React Native Testing Library)

```typescript
// mobile/src/screens/__tests__/DiscoveryScreen.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DiscoveryScreen from '../DiscoveryScreen';

describe('DiscoveryScreen', () => {
  it('should render profile cards', async () => {
    const { findByText } = render(<DiscoveryScreen />);
    
    const profileName = await findByText('Sarah Khan');
    expect(profileName).toBeTruthy();
  });

  it('should handle like action', async () => {
    const { getByTestId } = render(<DiscoveryScreen />);
    
    const likeButton = getByTestId('like-button');
    fireEvent.press(likeButton);
    
    // Assert API call was made
  });
});
```

---

## 🚀 Deployment Guide

### Backend Deployment (AWS)

**1. Set up EC2 instance**
```bash
# Launch Ubuntu 22.04 instance
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install Redis
sudo apt install redis-server

# Install PM2 for process management
sudo npm install -g pm2
```

**2. Deploy application**
```bash
# Clone repository
git clone https://github.com/your-org/vibetribe.git
cd vibetribe/backend

# Install dependencies
npm install --production

# Set up environment variables
nano .env

# Run migrations
npx prisma migrate deploy

# Start with PM2
pm2 start src/app.js --name vibetribe-api
pm2 save
pm2 startup
```

**3. Set up Nginx reverse proxy**
```nginx
server {
    listen 80;
    server_name api.vibetribe.app;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Mobile App Deployment

**iOS (TestFlight)**
```bash
# In mobile/ directory
cd ios
pod install
cd ..

# Build for TestFlight
npx react-native run-ios --configuration Release

# Use Xcode to archive and upload to App Store Connect
```

**Android (Google Play)**
```bash
# Generate signed APK
cd android
./gradlew bundleRelease

# Upload to Google Play Console
```

---

## 📈 Performance Optimization

### Backend Optimization

**1. Database Indexing**
- Add indexes on frequently queried fields
- Use composite indexes for multi-column queries
- Monitor slow queries with `EXPLAIN ANALYZE`

**2. Caching with Redis**
```javascript
// Cache user profiles
const getUserProfile = async (userId) => {
  const cacheKey = `user:${userId}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // Fetch from database
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  // Cache for 1 hour
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  
  return user;
};
```

**3. Pagination**
```javascript
// Cursor-based pagination for infinite scroll
const getFeed = async (cursor, limit = 10) => {
  return prisma.user.findMany({
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' }
  });
};
```

### Frontend Optimization

**1. Image Optimization**
```typescript
// Use FastImage for better performance
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: user.photoUrl, priority: FastImage.priority.high }}
  style={styles.image}
  resizeMode={FastImage.resizeMode.cover}
/>
```

**2. Lazy Loading**
```typescript
// Use React Query for data fetching with caching
const { data, fetchNextPage } = useInfiniteQuery({
  queryKey: ['discovery-feed'],
  queryFn: ({ pageParam = 0 }) => discoveryApi.getFeed(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor
});
```

---

## 📝 Code Quality & Standards

### ESLint Configuration
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/prop-types": "off"
  }
}
```

### Pre-commit Hooks (Husky)
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

---

**End of Implementation Instructions**

This guide provides the technical foundation for building VibeTribe. Follow these instructions systematically, and refer back to the Design Guide and Project Plan for context.

For questions or clarifications, consult with the technical lead or product manager.
