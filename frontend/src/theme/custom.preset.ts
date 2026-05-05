import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

/**
 * WorkTimer Custom PrimeNG Theme Preset
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
      0: 'oklch(0.25 0.015 85)', // --text-color
      50: 'oklch(0.96 0.008 85)', // --text-color (dark)
      100: 'oklch(0.793 0 192)', // --border-color
      200: 'oklch(0.4 0 192)', // --border-color (dark)
      300: 'oklch(0.6 0 192)',
      400: 'oklch(0.65 0 192)',
    },
    indigo: {
      0: '#ffffff',
      50: 'oklch(0.96 0.01 250)',
      100: 'oklch(0.92 0.025 250)',
      200: 'oklch(0.85 0.04 250)',
      300: 'oklch(0.75 0.055 250)',
      400: 'oklch(0.65 0.07 250)',
      500: 'oklch(0.57 0.09 250)',
      600: 'oklch(0.45 0.08 250)',
      700: 'oklch(0.35 0.07 250)',
      800: 'oklch(0.30 0.05 250)',
      900: 'oklch(0.23 0.035 250)',
      950: 'oklch(0.18 0.02 250)',
    },
  },
  semantic: {
    primary: {
      0: '#ffffff',
      50: 'oklch(0.96 0.008 85)',
      100: 'oklch(0.92 0.02 192)',
      200: 'oklch(0.85 0.03 192)',
      300: 'oklch(0.75 0.04 192)',
      400: 'oklch(0.65 0.05 192)',
      500: 'oklch(0.57 0.07 192)', // primary-light-color
      600: 'oklch(0.45 0.05 192)', // primary-color
      700: 'oklch(0.35 0.05 192)', // primary-color (dark)
      800: 'oklch(0.30 0.03 192)',
      900: 'oklch(0.23 0.02 192)',
      950: 'oklch(0.18 0.01 192)',
    },
    colorScheme: {
      light: {
        surface: {
          0: 'oklch(1 0 192)', // --surface-ground
          50: 'oklch(0.96 0 192)',
          100: 'oklch(0.94 0 192)', // --surface-light-gray
          200: 'oklch(0.92 0 192)',
          300: 'oklch(0.88 0 192)', // --surface-gray
          400: 'oklch(0.9 0 192)',
          500: 'oklch(0.793 0 192)',
          600: 'oklch(0.7 0 192)',
          700: 'oklch(0.6 0 192)',
          800: 'oklch(0.4 0 192)',
          900: 'oklch(1 0 192)', // --surface-ground
          950: 'oklch(0.96 0 192)', // --surface-background
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
          color: '{neutral.0}',
          mutedColor: '{neutral.300}',
        },
        formField: {
          color: '{text.color}',
          iconColor: '{text.color}',
          borderColor: '{neutral.100}',
          placeholderColor: '{neutral.100}',
        },
      },
      dark: {
        surface: {
          100: 'oklch(0.22 0 192)', // --surface-light-gray
          300: 'oklch(0.351 0 192)', // --surface-gray
          400: 'oklch(0.45 0 192)',
          900: 'oklch(0.252 0 0)', // --surface-ground (dark)
          950: 'oklch(0.198 0 192)', // --surface-background (dark)
        },
        primary: {
          color: '{primary.700}',
          contrastColor: '{text.color}',
          hoverColor: '{primary.600}',
          activeColor: '{primary.500}',
        },
        text: {
          color: '{neutral.50}',
          mutedColor: '{neutral.400}',
        },
        highlight: {
          color: '{text.color}',
        },
        formField: {
          color: '{text.color}',
          iconColor: '{text.color}',
          borderColor: '{neutral.200}',
          placeholderColor: '{neutral.200}',
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
              shadow:
                '0 1px 1px rgba(0, 0, 0, 0.04),\n' +
                '  0 4px 6px rgba(0, 0, 0, 0.06),\n' +
                '  0 10px 20px rgba(0, 0, 0, 0.08),\n' +
                '  0 20px 40px rgba(0, 0, 0, 0.10);',
            },
          },
          dark: {
            root: {
              shadow:
                '0 1px 2px rgba(0, 0, 0, 0.6),\n' +
                '  0 8px 24px rgba(0, 0, 0, 0.6),\n' +
                '  inset 0 1px 0 rgba(255, 255, 255, 0.05);',
            },
          },
        },
      },
      popover: {
        colorScheme: {
          light: {
            root: {
              shadow:
                '0 1px 1px rgba(0, 0, 0, 0.04),\n' +
                '  0 4px 6px rgba(0, 0, 0, 0.06),\n' +
                '  0 10px 20px rgba(0, 0, 0, 0.08),\n' +
                '  0 20px 40px rgba(0, 0, 0, 0.10);',
            },
          },
          dark: {
            root: {
              shadow:
                '0 1px 2px rgba(0, 0, 0, 0.6),\n' +
                '  0 8px 24px rgba(0, 0, 0, 0.6),\n' +
                '  inset 0 1px 0 rgba(255, 255, 255, 0.05);',
            },
          },
        },
      },
      modal: {
        colorScheme: {
          light: {
            root: {
              shadow:
                '0 1px 1px rgba(0, 0, 0, 0.04),\n' +
                '  0 4px 6px rgba(0, 0, 0, 0.06),\n' +
                '  0 10px 20px rgba(0, 0, 0, 0.08),\n' +
                '  0 20px 40px rgba(0, 0, 0, 0.10);',
            },
          },
          dark: {
            root: {
              shadow:
                '0 1px 2px rgba(0, 0, 0, 0.6),\n' +
                '  0 8px 24px rgba(0, 0, 0, 0.6),\n' +
                '  inset 0 1px 0 rgba(255, 255, 255, 0.05);',
            },
          },
        },
      },
      navigation: {
        colorScheme: {
          light: {
            root: {
              shadow:
                '0 1px 1px rgba(0, 0, 0, 0.04),\n' +
                '  0 4px 6px rgba(0, 0, 0, 0.06),\n' +
                '  0 10px 20px rgba(0, 0, 0, 0.08),\n' +
                '  0 20px 40px rgba(0, 0, 0, 0.10);',
            },
          },
          dark: {
            root: {
              shadow:
                '0 1px 2px rgba(0, 0, 0, 0.6),\n' +
                '  0 8px 24px rgba(0, 0, 0, 0.6),\n' +
                '  inset 0 1px 0 rgba(255, 255, 255, 0.05);',
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
            shadow:
              '0 1px 1px rgba(0, 0, 0, 0.04),\n' +
              '  0 4px 6px rgba(0, 0, 0, 0.06),\n' +
              '  0 10px 20px rgba(0, 0, 0, 0.08),\n' +
              '  0 20px 40px rgba(0, 0, 0, 0.10);',
          },
        },
        dark: {
          root: {
            shadow:
              '0 1px 2px rgba(0, 0, 0, 0.6),\n' +
              '  0 8px 24px rgba(0, 0, 0, 0.6),\n' +
              '  inset 0 1px 0 rgba(255, 255, 255, 0.05);',
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
