import { flutterElevationAndShadowColor } from "./builderImpl/flutterShadow";
import { AltSceneNode } from "../altNodes/altMixins";
import { flutterSize } from "./builderImpl/flutterSize";
import { flutterPadding } from "./builderImpl/flutterPadding";
import { flutterShape, flutterBorderRadius } from "./builderImpl/flutterBorder";
import {
  AltRectangleNode,
  AltEllipseNode,
  AltFrameNode,
} from "../altNodes/altMixins";
import { flutterColorFromFills } from "./builderImpl/flutterColor";
import { indentString } from "../common/indentString";

// https://api.flutter.dev/flutter/material/Material-class.html
export const flutterMaterial = (
  node: AltRectangleNode | AltEllipseNode | AltFrameNode,
  child: string
): string => {
  // ignore the view when size is zero or less
  // while technically it shouldn't get less than 0, due to rounding errors,
  // it can get to values like: -0.000004196293048153166
  if (node.width <= 0 || node.height <= 0) {
    return child;
  }

  const color = materialColor(node);
  const shape = materialShape(node);
  const clip = getClipping(node);
  const [elevation, shadowColor] = flutterElevationAndShadowColor(node);
  const padChild = child ? `\nchild: ${getPadding(node, child)}` : "";

  const materialAttr =
    color + elevation + shadowColor + shape + clip + padChild;

  let materialResult = `Material(${indentString(materialAttr)}\n),`;

  const fSize = flutterSize(node);
  const size = fSize.width + fSize.height;
  const isExpanded = fSize.isExpanded;

  if (size) {
    const properties = `${size}\nchild: ${materialResult}`;
    materialResult = `SizedBox(${indentString(properties)}\n),`;
  }

  if (isExpanded) {
    const properties = `\nchild: ${materialResult}`;
    materialResult = `Expanded(${indentString(properties)}\n),`;
  }

  return materialResult;
};

const materialColor = (
  node: AltRectangleNode | AltEllipseNode | AltFrameNode
): string => {
  const color = flutterColorFromFills(node.fills);
  if (!color) {
    return "\ncolor: Colors.transparent,";
  }
  return "\n" + color;
};

const materialShape = (
  node: AltRectangleNode | AltEllipseNode | AltFrameNode
): string => {
  if (node.type === "ELLIPSE" || node.strokes?.length > 0) {
    return flutterShape(node);
  } else {
    return flutterBorderRadius(node);
  }
};

const getClipping = (node: AltSceneNode): string => {
  let clip = false;
  if (node.type === "FRAME" && node.cornerRadius && node.cornerRadius !== 0) {
    clip = node.clipsContent;
  }
  return clip ? "\nclipBehavior: Clip.antiAlias," : "";
};

const getPadding = (
  node: AltFrameNode | AltEllipseNode | AltRectangleNode,
  child: string
): string => {
  const padding = flutterPadding(node);
  if (padding) {
    const properties = `${padding}\nchild: ${child}`;

    return `Padding(${indentString(properties)}\n),`;
  }

  return child;
};
