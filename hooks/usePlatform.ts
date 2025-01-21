import { Platform, useWindowDimensions } from 'react-native';

export function usePlatform() {
  const isWeb = Platform.OS === 'web';
  const isMobile = !isWeb;

  return { isWeb, isMobile };
}
