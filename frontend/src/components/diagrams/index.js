import { IntroFlowDiagram, DisplayTreeDiagram, CRTDiagram, RasterDiagram, RandomDiagram, ScanFlowDiagram } from "./DiagramsA";
import { RGBDiagram, CMYDiagram, HSVDiagram, DDAGridDiagram } from "./DiagramsB";

export const DIAGRAMS = {
  "intro-flow": IntroFlowDiagram,
  "display-tree": DisplayTreeDiagram,
  crt: CRTDiagram,
  raster: RasterDiagram,
  random: RandomDiagram,
  rgb: RGBDiagram,
  cmy: CMYDiagram,
  hsv: HSVDiagram,
  "dda-grid": DDAGridDiagram,
  "scan-flow": ScanFlowDiagram,
};
