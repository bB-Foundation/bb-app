import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Camera} from 'react-native-vision-camera';

import PermissionsView from './components/permissions-view';
import NoCameraDeviceError from './components/no-camera-device-error';
import {useQrScannerLogic} from './qr-scanner.hooks';

const QrScanner: FC = () => {
  const {codeScanner, hasPermission, device} = useQrScannerLogic();

  if (!hasPermission) return <PermissionsView />;

  if (device == null) return <NoCameraDeviceError />;

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
    />
  );
};

export default QrScanner;
