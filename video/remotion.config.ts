import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// Smooth gradients / text — higher quality JPEG frames before H.264 encode.
Config.setJpegQuality(95);
// The sandbox proxy intercepts TLS, so the headless browser must accept the
// proxy's cert to fetch the embedded Google Fonts.
Config.setChromiumIgnoreCertificateErrors(true);
