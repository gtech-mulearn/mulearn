import { useEffect, useRef, useCallback } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import './MuShepherdTour.css';

interface ShepherdStep {
  id?: string;
  element?: string;
  popover?: {
    title?: string;
    description?: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
  };
  buttons?: any[];
  [key: string]: any; // Allow additional Shepherd.js properties
}

interface MuShepherdTourOptions {
  steps: ShepherdStep[];
  isAutoStart?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
  showProgress?: boolean;
  allowClose?: boolean;
  overlayOpacity?: number;
  smoothScroll?: boolean;
  stagePadding?: number;
  stageRadius?: number;
  popoverOffset?: number;
  showButtons?: string[];
  disableActiveInteraction?: boolean;
  className?: string;
  onNextClick?: (element: Element | undefined, step: ShepherdStep, options: { config: any; state: any }) => void;
  onPrevClick?: (element: Element | undefined, step: ShepherdStep, options: { config: any; state: any }) => void;
}

export const useMuShepherdTour = ({
  steps,
  isAutoStart = false,
  onComplete,
  onSkip,
  showProgress = true,
  allowClose = true,
  overlayOpacity = 0.75,
  smoothScroll = true,
  stagePadding = 4,
  stageRadius = 4,
  popoverOffset = 10,
  showButtons = ['next', 'previous', 'close'],
  disableActiveInteraction = false,
  className = '',
  onNextClick,
  onPrevClick
}: MuShepherdTourOptions) => {
  const tourRef = useRef<Shepherd.Tour | null>(null);
  const isInitialized = useRef(false);
  const startTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initializeTour = useCallback(() => {
    // Prevent multiple initializations
    if (isInitialized.current && tourRef.current) {
      return;
    }

    // Clear any existing timeout
    if (startTimeoutRef.current) {
      clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }

    // Destroy existing tour if any
    if (tourRef.current) {
      try {
        tourRef.current.complete();
      } catch (error) {
        console.warn('Error destroying previous tour:', error);
      }
    }

    console.log('Initializing Shepherd.js tour...');

    // Create new tour
    tourRef.current = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: `mu-shepherd-popover ${className}`,
        scrollTo: { behavior: 'smooth', block: 'center' },
        modalOverlayOpeningPadding: stagePadding,
        modalOverlayOpeningRadius: stageRadius,
        buttons: []
      },
      tourName: 'mu-profile-tour',
      confirmCancel: false
    });

    // Convert steps to Shepherd format
    const shepherdSteps = steps.map((step, index) => {
      const isFirst = index === 0;
      const isLast = index === steps.length - 1;
      
      const buttons = [];
      
      if (allowClose && showButtons.includes('close')) {
        buttons.push({
          text: 'Skip Tour',
          classes: 'shepherd-button-skip',
          action() {
            if (onSkip) {
              onSkip();
            }
            return tourRef.current?.complete();
          }
        });
      }

      if (!isFirst && showButtons.includes('previous')) {
        buttons.push({
          text: '← Previous',
          classes: 'shepherd-button-secondary',
          action() {
            if (onPrevClick) {
              const element = step.element ? document.querySelector(step.element) || undefined : undefined;
              onPrevClick(element, step, { config: {}, state: { activeIndex: index } });
              
              // For tab switching steps, wait for DOM to update before proceeding
              const needsDelay = index === 8 || index === 9 || index === 10 || index === 11 || index === 12 || index === 13; // Steps that involve tab content
              if (needsDelay) {
                // Wait for tab content to render, then proceed
                setTimeout(() => {
                  // Check if previous step element exists before proceeding
                  const prevStepIndex = index - 1;
                  if (prevStepIndex >= 0) {
                    const prevStepElement = steps[prevStepIndex].element;
                    if (prevStepElement) {
                      const waitForElement = () => {
                        const targetElement = document.querySelector(prevStepElement);
                        if (targetElement) {
                          console.log('Previous target element found, proceeding to previous step');
                          tourRef.current?.back();
                        } else {
                          console.log('Previous target element not found, waiting...');
                          setTimeout(waitForElement, 100); // Check again in 100ms
                        }
                      };
                      waitForElement();
                    } else {
                      tourRef.current?.back();
                    }
                  } else {
                    tourRef.current?.back();
                  }
                }, 500); // Initial delay for tab switch
                return; // Don't proceed immediately
              }
            }
            return tourRef.current?.back();
          }
        });
      }

      if (!isLast) {
        buttons.push({
          text: 'Next →',
          classes: 'shepherd-button-primary',
          action() {
            if (onNextClick) {
              const element = step.element ? document.querySelector(step.element) || undefined : undefined;
              onNextClick(element, step, { config: {}, state: { activeIndex: index } });
              
              // For tab switching steps, wait for DOM to update before proceeding
              const needsDelay = index === 8 || index === 10 || index === 12; // Steps that trigger tab switches
              if (needsDelay) {
                // Wait for tab content to render, then proceed
                setTimeout(() => {
                  // Check if next step element exists before proceeding
                  const nextStepIndex = index + 1;
                  if (nextStepIndex < steps.length) {
                    const nextStepElement = steps[nextStepIndex].element;
                    if (nextStepElement) {
                      const waitForElement = () => {
                        const targetElement = document.querySelector(nextStepElement);
                        if (targetElement) {
                          console.log('Target element found, proceeding to next step');
                          tourRef.current?.next();
                        } else {
                          console.log('Target element not found, waiting...');
                          setTimeout(waitForElement, 100); // Check again in 100ms
                        }
                      };
                      waitForElement();
                    } else {
                      tourRef.current?.next();
                    }
                  }
                }, 500); // Initial delay for tab switch
                return; // Don't proceed immediately
              }
            }
            return tourRef.current?.next();
          }
        });
      } else {
        buttons.push({
          text: '🎉 Finish Tour',
          classes: 'shepherd-button-primary',
          action() {
            if (onComplete) {
              onComplete();
            }
            return tourRef.current?.complete();
          }
        });
      }

      let title = '';
      let text = '';
      if (showProgress) {
        const progressBar = `<div class="mu-tour-progress"><div class="mu-tour-progress-bar" style="width: ${((index + 1) / steps.length) * 100}%"></div></div>`;
        title = `${step.popover?.title || ''}`;
        text = `${progressBar}<div class="mu-tour-progress-text">Step ${index + 1} of ${steps.length}</div>${step.popover?.description || ''}`;
      } else {
        title = step.popover?.title || '';
        text = step.popover?.description || '';
      }

      // Improve positioning logic to prevent overlaps
      const getOptimalPosition = (element: Element) => {
        const rect = element.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const popoverWidth = 350; // Approximate popover width
        const popoverHeight = 200; // Approximate popover height
        
        // Check available space around the element
        const spaceAbove = rect.top;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceLeft = rect.left;
        const spaceRight = viewportWidth - rect.right;
        
        // Determine best position based on available space
        if (step.popover?.side) {
          // Use specified side if there's enough space
          switch (step.popover.side) {
            case 'top': return spaceAbove > popoverHeight + 20 ? 'top' : 'bottom';
            case 'bottom': return spaceBelow > popoverHeight + 20 ? 'bottom' : 'top';
            case 'left': return spaceLeft > popoverWidth + 20 ? 'left' : 'right';
            case 'right': return spaceRight > popoverWidth + 20 ? 'right' : 'left';
          }
        }
        
        // Auto-determine best position
        if (spaceBelow > popoverHeight + 20) return 'bottom';
        if (spaceAbove > popoverHeight + 20) return 'top';
        if (spaceRight > popoverWidth + 20) return 'right';
        if (spaceLeft > popoverWidth + 20) return 'left';
        
        // Fallback to bottom if no optimal position found
        return 'bottom';
      };

      return {
        title,
        text,
        attachTo: step.element ? {
          element: step.element,
          on: (() => {
            // Try to get optimal position if element exists
            const element = document.querySelector(step.element!);
            return element ? getOptimalPosition(element) : (step.popover?.side || 'bottom');
          })()
        } : undefined,
        buttons,
        classes: `mu-shepherd-step ${className}`,
        modalOverlayOpeningPadding: 12,
        modalOverlayOpeningRadius: 8,
        popperOptions: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 20] // Move popover 20px away from the element
              }
            }
          ]
        } as any,
        scrollTo: smoothScroll ? { behavior: 'smooth', block: 'center' } : false,
        // Add better element detection and positioning
        beforeShowPromise() {
          return new Promise<void>((resolve) => {
            if (step.element) {
              const waitForElement = () => {
                const element = document.querySelector(step.element!);
                if (element) {
                  // Element found, ensure it's visible and properly positioned
                  element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'center'
                  });
                  
                  // Wait for scroll to complete
                  setTimeout(() => {
                    resolve();
                  }, 500);
                } else {
                  // Element not found, wait a bit and try again
                  setTimeout(waitForElement, 100);
                }
              };
              waitForElement();
            } else {
              resolve();
            }
          });
        }
      };
    });

    // Add steps to tour
    shepherdSteps.forEach(shepherdStep => {
      tourRef.current?.addStep(shepherdStep as any);
    });

    // Event listeners
    tourRef.current?.on('complete', () => {
      console.log('Tour completed');
      if (onComplete) {
        onComplete();
      }
    });

    tourRef.current?.on('cancel', () => {
      console.log('Tour cancelled/skipped');
      if (onSkip) {
        onSkip();
      }
    });

    // Add show event to dynamically update step counter
    tourRef.current?.on('show', (event) => {
      if (showProgress && event.step && tourRef.current) {
        // Get current step index from tour
        const currentStep = tourRef.current.getCurrentStep();
        const allSteps = tourRef.current.steps || [];
        const currentIndex = allSteps.findIndex(step => step === currentStep);
        const stepNumber = currentIndex >= 0 ? currentIndex + 1 : 1;
        
        console.log('Updating step counter:', { currentIndex, stepNumber, totalSteps: steps.length });
        
        // Update the progress text dynamically
        const progressTextElement = document.querySelector('.mu-tour-progress-text');
        if (progressTextElement) {
          progressTextElement.textContent = `Step ${stepNumber} of ${steps.length}`;
        }
        
        // Update progress bar
        const progressBarElement = document.querySelector('.mu-tour-progress-bar') as HTMLElement;
        if (progressBarElement) {
          progressBarElement.style.width = `${(stepNumber / steps.length) * 100}%`;
        }
      }
    });

    isInitialized.current = true;
    console.log('Shepherd.js tour initialized successfully');
  }, [steps, showProgress, allowClose, overlayOpacity, smoothScroll, stagePadding, stageRadius, popoverOffset, showButtons, disableActiveInteraction, className, onComplete, onNextClick, onPrevClick, onSkip]);

  useEffect(() => {
    // Only initialize once
    if (!isInitialized.current) {
      initializeTour();
    }

    if (isAutoStart && tourRef.current) {
      // Clear any existing timeout
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
      }
      
      startTimeoutRef.current = setTimeout(() => {
        if (tourRef.current && !tourRef.current.isActive()) {
          console.log('Auto-starting tour after delay...');
          startTour();
        }
      }, 800); // Slightly longer delay for better stability
    }

    return () => {
      // Clear timeout on cleanup
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
        startTimeoutRef.current = null;
      }
      
      // Only destroy if component is actually unmounting
      if (tourRef.current) {
        try {
          tourRef.current.complete();
        } catch (error) {
          console.warn('Error destroying tour on cleanup:', error);
        }
      }
      isInitialized.current = false;
    };
  }, []); // Removed dependencies to prevent re-initialization

  const startTour = useCallback(() => {
    if (tourRef.current && !tourRef.current.isActive()) {
      console.log('Starting tour...');
      try {
        tourRef.current.start();
      } catch (error) {
        console.error('Error starting tour:', error);
        // Reinitialize if there's an error
        isInitialized.current = false;
        initializeTour();
        if (tourRef.current) {
          tourRef.current.start();
        }
      }
    } else if (tourRef.current?.isActive()) {
      console.log('Tour is already active, not starting again');
    } else {
      console.warn('Tour not initialized, cannot start tour');
    }
  }, [initializeTour]);

  const skipTour = useCallback(() => {
    if (tourRef.current) {
      tourRef.current.complete();
      if (onSkip) {
        onSkip();
      }
    }
  }, [onSkip]);

  const nextStep = useCallback(() => {
    if (tourRef.current) {
      tourRef.current.next();
    }
  }, []);

  const previousStep = useCallback(() => {
    if (tourRef.current) {
      tourRef.current.back();
    }
  }, []);

  const isActive = useCallback(() => {
    return tourRef.current ? tourRef.current.isActive() : false;
  }, []);

  const destroy = useCallback(() => {
    if (tourRef.current) {
      try {
        tourRef.current.complete();
      } catch (error) {
        console.warn('Error destroying tour:', error);
      }
    }
    isInitialized.current = false;
  }, []);

  return {
    startTour,
    skipTour,
    nextStep,
    previousStep,
    isActive,
    destroy,
    tour: tourRef.current
  };
};

export type { MuShepherdTourOptions, ShepherdStep };