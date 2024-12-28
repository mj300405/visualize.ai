export const colors = {
    // Spotify's main colors
    primary: '#1DB954',      // Spotify Green
    primaryDark: '#169C46',  // Darker shade of Spotify Green
    background: '#121212',   // Main background
    surface: '#282828',      // Card/Surface background
    surfaceAlt: '#181818',   // Alternative surface color
    
    // Text colors
    text: '#FFFFFF',         // Primary text
    textSecondary: '#B3B3B3',// Secondary text
    textTertiary: '#6A6A6A', // Muted text
    
    // Functional colors
    error: '#FF4B4B',        // Error state
    success: '#1DB954',      // Success state
    warning: '#FFB049',      // Warning state
    
    // Interactive states
    hover: '#333333',        // Hover state background
    pressed: '#404040',      // Pressed state background
    
    // Gradients (as single colors for now)
    gradientStart: '#404040',
    gradientEnd: '#282828',
  };
  
  export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  };
  
  export const typography = {
    header: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      letterSpacing: -0.5,
    },
    subheader: {
      fontSize: 20,
      fontWeight: '600' as const,
      letterSpacing: -0.3,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal' as const,
      letterSpacing: 0,
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal' as const,
      letterSpacing: 0.1,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      letterSpacing: 0.2,
    },
  };
  
  // Common style mixins
  export const shadows = {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3.84,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.46,
      elevation: 5,
    },
  };
  
  // Border radiuses
  export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 999, // For circular elements
  };