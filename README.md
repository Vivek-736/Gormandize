<div align="center">

# 🍔 GORMANDIZE

### *Where Every Bite Tells a Story*

<img src="./assets/images/logo.png" alt="Gormandize Logo" width="200" />

[![Made with React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.25-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Backend-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)

**A Revolutionary Food Ordering Experience**  
*Crafted with passion, powered by innovation*

[✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📱 Screenshots](#-screenshots) • [🏗️ Architecture](#️-architecture) • [🎨 Design](#-design-philosophy)

---

</div>

## 🌟 What Makes Gormandize Extraordinary?

> **Gormandize** isn't just another food delivery app — it's a **culinary journey** wrapped in pixels. Built from the ground up with cutting-edge technologies and an obsession for perfection, this app transforms the mundane act of ordering food into an **immersive, delightful experience**.

### 💎 The Gormandize Difference

```
🎯 PRECISION ENGINEERING    →  Every component meticulously crafted
🎨 AESTHETIC EXCELLENCE     →  UI that makes your eyes dance
⚡ BLAZING PERFORMANCE      →  60 FPS animations, zero compromises
🔒 ENTERPRISE SECURITY      →  Appwrite-powered authentication
🌈 DELIGHTFUL INTERACTIONS  →  Micro-animations that spark joy
```

---

## ✨ Features

### 🔐 **Smart Authentication System**
- **Seamless sign-up/sign-in** with email & password
- **Session persistence** with secure token management
- **Avatar generation** with user initials (because defaults are boring)
- **Protected routes** - security first, always

### 🍕 **Intelligent Food Discovery**
- **Dynamic category filtering** (Burgers, Pizzas, Burritos, Wraps & more)
- **Real-time search** with debounced queries for optimal performance
- **Smart recommendations** based on popularity & ratings
- **Beautiful empty states** that don't make you cry

### 🎨 **Customization Paradise**
- **Interactive topping selection** - tap, select, delight
- **Side options galore** - Fries, Coke, Garlic Bread, you name it
- **Live price calculation** as you customize
- **Visual feedback** with smooth animations

### 🛒 **Cart Management Excellence**
- **Zustand-powered state** for lightning-fast updates
- **Persistent cart** across app sessions
- **Quantity controls** with satisfying haptic feedback
- **Customization tracking** per item
- **Smart total calculation** including all add-ons

### 👤 **Profile Perfection**
- **User avatar** with first letter on vibrant orange background
- **Account information** display (name, email, location)
- **Secure logout** with confirmation dialog
- **Editable fields** ready for future enhancements

### 🎯 **Product Details Excellence**
- **Split-screen layout** - details on left, drool-worthy image on right
- **5-star rating system** with visual indicators
- **Nutritional information** (Calories, Protein)
- **Delivery estimates** (20-30 mins, Free Delivery)
- **Compact customization cards** with smart text truncation

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.x
npm >= 9.x or yarn >= 1.22.x
Expo CLI
iOS Simulator / Android Emulator / Physical Device
```

### Installation

```bash
# Clone this masterpiece
git clone https://github.com/Vivek-736/Gormandize.git
cd Gormandize

# Install dependencies (grab a coffee ☕)
npm install

# Set up your environment
cp .env.example .env
# Add your Appwrite credentials to .env

# Launch the magic ✨
npx expo start
```

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://sgp.cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
EXPO_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id
EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID=user
EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID=categories
EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID=menu
EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID=customizations
EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID=menu_customizations
```

### Seed Your Database

```bash
# Navigate to the search tab in the app
# Click the "seed test" button
# Watch your database come to life! 🌱
```

---

## 📱 Screenshots

<div align="center">

### 🏠 Home Screen
*Stunning offer cards with gradient backgrounds*

### 🔍 Search & Filter
*Real-time search with category filters*

### 📦 Product Details
*Immersive product view with customization options*

### 🛒 Shopping Cart
*Beautiful cart with quantity controls*

### 👤 User Profile
*Elegant profile with avatar & user info*

</div>

---

## 🏗️ Architecture

### Tech Stack

```typescript
Frontend Framework    →  React Native 0.81.5 + Expo SDK 54
Navigation           →  Expo Router (File-based routing)
State Management     →  Zustand (Lightweight & Powerful)
Styling             →  NativeWind (Tailwind for React Native)
Backend             →  Appwrite (BaaS with superpowers)
Fonts               →  Quicksand (All weights)
Error Tracking      →  Sentry
Type Safety         →  TypeScript 5.x
```

### Project Structure

```
Gormandize/
├── 📱 app/
│   ├── (auth)/              # Authentication screens
│   │   ├── sign-in.tsx      # Login with validation
│   │   └── sign-up.tsx      # Registration flow
│   ├── (tabs)/              # Main app tabs
│   │   ├── index.tsx        # Home with offer cards
│   │   ├── search.tsx       # Search & filter
│   │   ├── cart.tsx         # Shopping cart
│   │   └── profile.tsx      # User profile
│   ├── product/             
│   │   └── [id].tsx         # Dynamic product details
│   └── _layout.tsx          # Root navigation
│
├── 🎨 components/
│   ├── CartButton.tsx       # Floating cart with badge
│   ├── CartItem.tsx         # Cart item card
│   ├── CustomButton.tsx     # Reusable button
│   ├── CustomInput.tsx      # Themed input field
│   ├── Filter.tsx           # Category filters
│   ├── Loading.tsx          # Branded loader
│   ├── MenuCard.tsx         # Product card
│   └── SearchBar.tsx        # Search input
│
├── 🗄️ store/
│   ├── auth.store.ts        # Authentication state
│   └── cart.store.ts        # Shopping cart state
│
├── 📡 lib/
│   ├── appwrite.ts          # Appwrite SDK setup
│   ├── data.ts              # Seed data
│   ├── seed.ts              # Database seeding
│   └── useAppwrite.ts       # Custom hook
│
├── 🎨 assets/
│   ├── fonts/               # Quicksand font family
│   ├── icons/               # App icons
│   └── images/              # Product images & graphics
│
└── 📝 constants/
    └── index.ts             # App constants & data
```

---

## 🎨 Design Philosophy

### Color Palette

```css
🔶 Primary Orange    →  #FE8C00  /* The Gormandize signature */
⚫ Dark Charcoal    →  #181C2E  /* Text & accents */
⚪ Pure White       →  #FFFFFF  /* Clean backgrounds */
🔴 Error Red        →  #F14141  /* Validation errors */
🟢 Success Green    →  #2F9B65  /* Confirmations */
```

### Typography Hierarchy

```
H1 Bold         →  30px   (Quicksand Bold)
H3 Bold         →  20px   (Quicksand Bold)
Base Bold       →  18px   (Quicksand Bold)
Paragraph       →  16px   (Quicksand Medium/Semibold)
Body            →  14px   (Quicksand Regular/Medium)
Small           →  12px   (Quicksand Bold)
```

### Design Principles

1. **🎯 Clarity Over Complexity** - Every element has purpose
2. **✨ Delight in Details** - Micro-interactions matter
3. **🌊 Fluid Motion** - 60 FPS or nothing
4. **📱 Mobile-First** - Designed for thumbs
5. **🎨 Visual Hierarchy** - Guide the eye naturally

---

## 🔥 Key Features Deep Dive

### 🎪 Dynamic Offer Cards
Navigate from home to filtered search with smooth transitions. Each card maps to specific categories:
- **Summer Combo** → Burgers
- **Burger Bash** → Burgers  
- **Pizza Party** → Pizzas
- **Burrito Delight** → Burritos

### 🎯 Smart Category Filtering
Backend queries Appwrite by category name, automatically resolves to category IDs, returns filtered menu items. Zero manual ID mapping required!

### 💾 Optimized State Management
```typescript
// Zustand store example
const useCartStore = create((set, get) => ({
  items: [],
  addItem: (item) => { /* Add with customizations */ },
  getTotalPrice: () => { /* Calculate including add-ons */ }
}))
```

### 🔐 Robust Authentication
- Session cleanup before new login (prevents conflicts)
- 20-second timeout for user fetch operations
- Avatar URL generation with user initials
- Protected routes with redirect logic

---

## 🛠️ Development Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS  
npm run ios

# Run on Web
npm run web

# Lint code
npm run lint

# Reset project (fresh start)
npm run reset-project
```

---

## 🎓 What I Learned Building This

- ✅ **File-based routing** with Expo Router is pure magic
- ✅ **Zustand** beats Redux in simplicity (fight me)
- ✅ **NativeWind** makes styling actually enjoyable
- ✅ **Appwrite** BaaS setup faster than custom backend
- ✅ **Type safety** saves hours of debugging
- ✅ **Component composition** > monolithic components
- ✅ **Custom hooks** for reusable logic patterns

---

## 🚧 Roadmap

- [ ] 🌙 Dark mode support
- [ ] 🗺️ Google Maps integration for delivery tracking
- [ ] 💳 Payment gateway integration (Stripe/Razorpay)
- [ ] 🔔 Push notifications for order updates
- [ ] ⭐ Review & rating system
- [ ] 🏆 Loyalty rewards program
- [ ] 📍 Multi-location restaurant support
- [ ] 🎤 Voice search functionality
- [ ] 🤖 AI-powered recommendations

---

## 🤝 Contributing

Contributions are **always welcome**! Whether it's:

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements

**Steps:**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Vivek**  
🔗 [GitHub](https://github.com/Vivek-736) • 💼 [LinkedIn](#) • 🐦 [Twitter](#)

> *"Code is poetry written in logic"* ✨

---

## 🙏 Acknowledgments

- **Expo Team** - For the amazing developer experience
- **Appwrite** - For the powerful BaaS platform
- **React Native Community** - For endless inspiration
- **Coffee** - For keeping me awake during those 3 AM debugging sessions ☕

---

<div align="center">

### 🌟 Star this repo if it made you hungry! 🌟

**Made with 💖 and countless cups of ☕ by Vivek**

*Gormandize - Because food deserves better apps*

</div>

---

## 📊 Stats

```
📦 Total Lines of Code    →  10,000+
⏱️  Development Time       →  40+ hours
🎨 Components Built       →  20+
☕ Coffee Consumed        →  Infinite
🐛 Bugs Squashed         →  127 (and counting)
😊 Satisfaction Level    →  Over 9000!
```

---

<div align="center">

**If you've read this far, you're awesome! 🎉**

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com)

*Now go build something amazing!* 🚀

</div>