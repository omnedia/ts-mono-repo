import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const palette = {
  white: 'var(--palette-white)',
  black: 'var(--palette-black)',
  primary: 'var(--primary-color)',
  primaryLight: 'var(--primary-light-color)',
  primaryText: 'var(--primary-color-text)',
  secondary: 'var(--secondary-color)',
  surfaceBackground: 'var(--surface-background)',
  surfaceGround: 'var(--surface-ground)',
  surfaceGray: 'var(--surface-gray)',
  surfaceLightGray: 'var(--surface-light-gray)',
  border: 'var(--border-color)',
  text: 'var(--text-color)',
} as const;

const mix = (color: string, percent: number, base: string = palette.white): string =>
  `color-mix(in oklch, ${color} ${percent}%, ${base})`;

const alpha = (color: string, percent: number): string =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

const shadow = {
  light:
    `0 1px 1px ${alpha(palette.black, 4)},\n` +
    `  0 4px 6px ${alpha(palette.black, 6)},\n` +
    `  0 10px 20px ${alpha(palette.black, 8)},\n` +
    `  0 20px 40px ${alpha(palette.black, 10)};`,
  dark:
    `0 1px 2px ${alpha(palette.black, 60)},\n` +
    `  0 8px 24px ${alpha(palette.black, 60)},\n` +
    `  inset 0 1px 0 ${alpha(palette.white, 5)};`,
} as const;

/**
 * Custom PrimeNG Theme Preset
 *
 * This preset extends the Aura theme with custom colors and design tokens
 * that match the existing CSS variables used in the application.
 */
export const CustomPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '0.125rem',
      sm: '0.25rem', // --radius-s
      md: '0.5rem', // --radius-l
      lg: '0.75rem', // --radius-xl
      xl: '1rem', // --radius-2xl
    },
    neutral: {
      0: palette.text,
      50: palette.text,
      100: palette.border,
      200: palette.border,
      300: palette.secondary,
      400: mix(palette.secondary, 82, palette.white),
    },
    indigo: {
      0: palette.white,
      50: mix(palette.secondary, 8),
      100: mix(palette.secondary, 16),
      200: mix(palette.secondary, 28),
      300: mix(palette.secondary, 42),
      400: mix(palette.secondary, 58),
      500: palette.secondary,
      600: mix(palette.secondary, 88, palette.black),
      700: mix(palette.secondary, 76, palette.black),
      800: mix(palette.secondary, 64, palette.black),
      900: mix(palette.secondary, 50, palette.black),
      950: mix(palette.secondary, 38, palette.black),
    },
  },
  semantic: {
    primary: {
      0: palette.primaryText,
      50: mix(palette.primary, 8),
      100: mix(palette.primary, 16),
      200: mix(palette.primary, 28),
      300: mix(palette.primaryLight, 58),
      400: mix(palette.primary, 72),
      500: palette.primaryLight,
      600: palette.primary,
      700: mix(palette.primary, 84, palette.black),
      800: mix(palette.primary, 70, palette.black),
      900: mix(palette.primary, 56, palette.black),
      950: mix(palette.primary, 42, palette.black),
    },
    colorScheme: {
      light: {
        surface: {
          0: palette.surfaceGround,
          50: mix(palette.surfaceBackground, 45, palette.surfaceGround),
          100: palette.surfaceLightGray,
          200: mix(palette.surfaceBackground, 70, palette.surfaceGround),
          300: palette.surfaceGray,
          400: mix(palette.border, 28, palette.surfaceGround),
          500: palette.border,
          600: mix(palette.border, 88, palette.black),
          700: mix(palette.border, 76, palette.black),
          800: mix(palette.border, 64, palette.black),
          900: palette.surfaceGround,
          950: palette.surfaceBackground,
        },
        primary: {
          color: '{primary.600}',
          contrastColor: '{primary.0}',
          hoverColor: '{primary.700}',
          activeColor: '{primary.800}',
        },
        highlight: {
          background: '{primary.300}',
          focusBackground: '{primary.100}',
          color: '{text.color}',
          focusColor: '{primary.800}',
        },
        text: {
          color: palette.text,
          mutedColor: palette.secondary,
        },
        formField: {
          color: '{text.color}',
          iconColor: '{text.color}',
          borderColor: palette.border,
          placeholderColor: palette.border,
        },
      },
      dark: {
        surface: {
          100: palette.surfaceLightGray,
          300: palette.surfaceGray,
          400: mix(palette.surfaceGray, 82, palette.white),
          900: palette.surfaceGround,
          950: palette.surfaceBackground,
        },
        primary: {
          color: '{primary.600}',
          contrastColor: '{text.color}',
          hoverColor: '{primary.700}',
          activeColor: '{primary.500}',
        },
        text: {
          color: palette.text,
          mutedColor: palette.secondary,
        },
        highlight: {
          color: '{text.color}',
        },
        formField: {
          color: '{text.color}',
          iconColor: '{text.color}',
          borderColor: palette.border,
          placeholderColor: palette.border,
        },
      },
    },
    formField: {
      paddingX: '1.5rem',
      paddingY: '0.625rem',
      sm: {
        fontSize: '0.875rem',
        paddingX: '1.25rem',
        paddingY: '0.5rem',
      },
      lg: {
        fontSize: '1.125rem',
        paddingX: '1.75rem',
        paddingY: '0.875rem',
      },
      borderRadius: '{border.radius.lg}',
    },
    list: {
      padding: '0.5rem 0.5rem 0.5rem 0.5rem',
      header: {
        padding: '0.5rem 0.5rem 0.25rem 0.5rem',
      },
      option: {
        borderRadius: '{border.radius.lg}',
      },
    },
    overlay: {
      select: {
        borderRadius: '{border.radius.lg}',
      },
      popover: {
        borderRadius: '{border.radius.lg}',
        padding: '0.75rem',
      },
      modal: {
        borderRadius: '{border.radius.xl}',
        padding: '1.25rem',
      },
      navigation: {},
    },
  },
  components: {
    badge: {
      colorScheme: {
        light: {
          secondary: {
            background: '{indigo.400}',
            color: '{primary.contrastColor}',
          },
        },
        dark: {
          secondary: {
            background: '{indigo.800}',
            color: '{primary.contrastColor}',
          },
        },
      },
    },
    overlay: {
      select: {
        colorScheme: {
          light: {
            root: {
              shadow: shadow.light,
            },
          },
          dark: {
            root: {
              shadow: shadow.dark,
            },
          },
        },
      },
      popover: {
        colorScheme: {
          light: {
            root: {
              shadow: shadow.light,
            },
          },
          dark: {
            root: {
              shadow: shadow.dark,
            },
          },
        },
      },
      modal: {
        colorScheme: {
          light: {
            root: {
              shadow: shadow.light,
            },
          },
          dark: {
            root: {
              shadow: shadow.dark,
            },
          },
        },
      },
      navigation: {
        colorScheme: {
          light: {
            root: {
              shadow: shadow.light,
            },
          },
          dark: {
            root: {
              shadow: shadow.dark,
            },
          },
        },
      },
    },
    card: {
      body: {
        gap: '1rem',
      },
      colorScheme: {
        light: {
          root: {
            shadow: shadow.light,
          },
        },
        dark: {
          root: {
            shadow: shadow.dark,
          },
        },
      },
    },
    button: {
      colorScheme: {
        light: {
          outlined: {
            primary: {
              color: '{text.color}',
            },
          },
        },
        dark: {
          outlined: {
            primary: {
              color: '{primary.0}',
            },
          },
        },
      },
      root: {
        borderRadius: '{border.radius.lg}',
        paddingX: '1.5rem',
        paddingY: '0.625rem',
      },
    },
    togglebutton: {
      colorScheme: {
        light: {
          root: {
            color: '{text.color}',
            checkedColor: '{text.color}',
          },
          icon: {
            color: '{text.color}',
            checkedColor: '{text.color}',
          },
        },
        dark: {
          root: {
            color: '{text.color}',
            checkedColor: '{text.color}',
          },
          icon: {
            color: '{text.color}',
            checkedColor: '{text.color}',
          },
        },
      },
    },
    tree: {
      root: {
        color: '{text.color}',
        gap: '0',
        indent: '0',
        padding: '0',
      },
      node: {
        padding: '1rem 2rem',
        gap: '0.5rem',
        borderRadius: '0',
        hoverBackground: '{surface.300}',
        selectedBackground: '{primary.color}',
        selectedColor: '{primary.contrastColor}',
      },
      nodeIcon: {
        color: '{text.color}',
        hoverColor: '{text.color}',
        selectedColor: '{primary.contrastColor}',
      },
      nodeToggleButton: {
        borderRadius: '50%',
        size: '24px',
        hoverBackground: '{surface.400}',
      },
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
          },
        },
        dark: {
          root: {
            background: '{surface.900}',
          },
        },
      },
      css: `
        .p-tree-node-content {
          white-space: nowrap;
        }

        .p-tree-node-children .p-tree-node-content {
          padding-left: 3rem;
        }
    `,
    },
    password: {
      css: `
        .p-password-input {
          width: 100%;
        }
      `,
    },
    progressspinner: {
      colorScheme: {
        light: {
          root: {
            colorOne: '{text.color}',
            colorTwo: '{text.color}',
            colorThree: '{text.color}',
            colorFour: '{text.color}',
          },
        },
        dark: {
          root: {
            colorOne: '{text.color}',
            colorTwo: '{text.color}',
            colorThree: '{text.color}',
            colorFour: '{text.color}',
          },
        },
      },
    },
    datatable: {
      colorScheme: {
        light: {
          row: {
            stripedBackground: '{surface.50}',
          },
        },
        dark: {
          row: {
            stripedBackground: '{surface.950}',
          },
        },
      },
    },
    tabs: {
      tab: {
        activeBorderColor: '{text.color}',
        activeColor: '{text.color}',
      },
    },
  },
  css: `
    .p-tab {
      display: flex;
      align-items: center;
    }

    .p-button-icon.p-icon {
      display: inline-flex;
    }
  `,
});
