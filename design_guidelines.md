# Design Guidelines: InnovateX Registration & Certificate Portal

## Design Approach
**User-Specified Theme**: Black background with neon green accent colors - modern, minimal, professional aesthetic with cyberpunk-inspired glowing elements.

## Core Design Elements

### Color Palette
- **Primary Background**: Pure black (`bg-black`)
- **Accent Color**: Neon green (`#00ff00` or similar vibrant green)
- **Card Backgrounds**: Dark/black cards
- **Text**: White/light gray for readability on black
- **Borders**: Neon green glowing borders
- **Buttons**: Neon green with glow effects

### Typography
- Clean, modern sans-serif font (e.g., Inter, Poppins via Google Fonts)
- Smooth, readable font across all screen sizes
- Hierarchy: Large titles, medium headings, standard body text

### Layout System
- **Spacing**: Use Tailwind units of 4, 6, 8, and 12 for consistent spacing (p-4, p-6, p-8, m-12, etc.)
- **Mobile-first**: Design starts from mobile (320px) and scales up
- **Centered layouts**: Primary content centered on Home page
- **Card-based**: Use card containers for forms and content sections

### Component Library

#### Buttons
- Neon green background with glow effect
- Rounded corners (`rounded-lg` or `rounded-xl`)
- Hover states with enhanced glow
- Loading states with animations
- Smooth transitions on all interactions

#### Input Fields (Reusable Component)
- Black/dark card background
- Neon green border (2px)
- Focus state: Enhanced neon glow
- Rounded corners
- Mobile-friendly sizing (min-height for touch targets)
- Clear labels above inputs

#### Cards
- Rounded corners (`rounded-xl`)
- Neon green borders (optional glow effect)
- Black/dark background
- Adequate padding for mobile comfort
- Shadow/glow effects for depth

#### Success/Error Messages
- Success: Neon green background/border with glow
- Error: Red alternative (maintaining theme)
- Smooth fade-in animations

### Page-Specific Guidelines

#### Home Page
- Fully centered vertical and horizontal layout
- Large title: "InnovateX Registration & Certificate Portal"
- Two prominent neon green buttons stacked vertically on mobile, side-by-side on desktop
- Minimal design with focus on CTA buttons
- No hero image - pure cyberpunk aesthetic with glowing elements

#### Registration Page
- Modern card container with neon border
- Form fields organized in clear sections
- Team Details section with Team Name and Project Title
- Members section with 4 slots (first 2 required, last 2 optional but clearly indicated)
- Each member: Name and Email inputs side-by-side on desktop, stacked on mobile
- Submit button at bottom with loading spinner state
- Success message overlay/modal with neon green styling

#### Certificate Download Page
- Card with email input field
- "Check Certificate" button below input
- Results area with neon-glowing borders
- List of downloadable certificates if found
- Clear "Email not registered" message if not found
- Download links styled as neon green buttons

### Responsive Behavior
- **Mobile (< 768px)**: Single column, full-width cards with adequate padding, stacked buttons, stacked form fields
- **Tablet (768px - 1024px)**: Moderate card widths, some side-by-side layouts for form fields
- **Desktop (> 1024px)**: Max-width containers, side-by-side buttons, optimized spacing

### Animations
- Smooth transitions on all interactive elements (0.3s ease)
- Loading spinners for async operations
- Fade-in for success/error messages
- Subtle glow pulse on neon borders (optional, use sparingly)
- Button hover: Slight scale + enhanced glow

### Accessibility
- High contrast (white text on black, neon green accents)
- Touch targets minimum 44px for mobile
- Clear focus states with neon green outline
- Proper form labels and error messages
- Keyboard navigation support

## Images
**No images required** - This design uses pure UI elements with the cyberpunk neon aesthetic. Focus on glowing borders, smooth gradients, and neon green accents to create visual interest.