import { IntroFlowDiagram, DisplayTreeDiagram, CRTDiagram, RasterDiagram, RandomDiagram, ScanFlowDiagram } from "./DiagramsA";
import { RGBDiagram, CMYDiagram, HSVDiagram, DDAGridDiagram } from "./DiagramsB";
import { CircleOctantsDiagram, ScanlineFillDiagram, Transforms2DDiagram, ReflectShearDiagram, WindowViewportDiagram, RegionCodesDiagram } from "./DiagramsC";
import { Axes3DDiagram, ProjectionTreeDiagram, ParallelVsPerspectiveDiagram, ZBufferDiagram, BezierDiagram } from "./DiagramsD";
import { MMComponentsDiagram, BitmapVectorDiagram, AudioSamplingDiagram, VideoFramesDiagram, KeyframeTweenDiagram, CompressionTreeDiagram } from "./DiagramsE";
import { JPEGPipelineDiagram, MPEGFramesDiagram, HuffmanTreeDiagram, CDDVDDiagram, StreamingDiagram, VRSetupDiagram } from "./DiagramsF";

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
  "circle-octants": CircleOctantsDiagram,
  "scanline-fill": ScanlineFillDiagram,
  "transforms-2d": Transforms2DDiagram,
  "reflect-shear": ReflectShearDiagram,
  "window-viewport": WindowViewportDiagram,
  "region-codes": RegionCodesDiagram,
  "axes-3d": Axes3DDiagram,
  "projection-tree": ProjectionTreeDiagram,
  "parallel-vs-perspective": ParallelVsPerspectiveDiagram,
  zbuffer: ZBufferDiagram,
  bezier: BezierDiagram,
  "mm-components": MMComponentsDiagram,
  "bitmap-vector": BitmapVectorDiagram,
  "audio-sampling": AudioSamplingDiagram,
  "video-frames": VideoFramesDiagram,
  "keyframe-tween": KeyframeTweenDiagram,
  "compression-tree": CompressionTreeDiagram,
  "jpeg-pipeline": JPEGPipelineDiagram,
  "mpeg-frames": MPEGFramesDiagram,
  "huffman-tree": HuffmanTreeDiagram,
  "cd-dvd": CDDVDDiagram,
  streaming: StreamingDiagram,
  "vr-setup": VRSetupDiagram,
};
