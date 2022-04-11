import { tailwindPadding } from "../../../src/tailwind/builderImpl/tailwindPadding";
import { AltRectangleNode } from "../../../src/altNodes/altMixins";
import { AltFrameNode } from "../../../src/altNodes/altMixins";

describe("Tailwind padding", () => {
  it("test tailwind padding", () => {
    const frameNode = new AltFrameNode();
    expect(tailwindPadding(frameNode)).toEqual("");

    frameNode.layoutMode = "NONE";
    expect(tailwindPadding(frameNode)).toEqual("");

    frameNode.layoutMode = "VERTICAL";

    frameNode.paddingLeft = 0;
    frameNode.paddingRight = 0;
    frameNode.paddingTop = 4.1;
    frameNode.paddingBottom = 4.2;
    expect(tailwindPadding(frameNode)).toEqual("py-1 ");

    frameNode.paddingLeft = 8;
    frameNode.paddingRight = 8.01;
    frameNode.paddingTop = 4;
    frameNode.paddingBottom = 4;
    expect(tailwindPadding(frameNode)).toEqual("px-2 py-1 ");

    frameNode.paddingLeft = 4;
    frameNode.paddingRight = 4;
    frameNode.paddingTop = 0;
    frameNode.paddingBottom = 0;
    expect(tailwindPadding(frameNode)).toEqual("px-1 ");

    frameNode.paddingLeft = 4;
    frameNode.paddingRight = 4;
    frameNode.paddingTop = 8;
    frameNode.paddingBottom = 8;
    expect(tailwindPadding(frameNode)).toEqual("px-1 py-2 ");

    frameNode.paddingLeft = 4;
    frameNode.paddingRight = 4;
    frameNode.paddingTop = 8;
    frameNode.paddingBottom = 8;
    expect(tailwindPadding(frameNode)).toEqual("px-1 py-2 ");

    frameNode.paddingLeft = 4;
    frameNode.paddingRight = 4;
    frameNode.paddingTop = 4;
    frameNode.paddingBottom = 4;
    expect(tailwindPadding(frameNode)).toEqual("p-1 ");

    frameNode.paddingLeft = 4;
    frameNode.paddingRight = 4.5;
    frameNode.paddingTop = 4;
    frameNode.paddingBottom = 4.5;
    expect(tailwindPadding(frameNode)).toEqual("px-1 py-1 ");

    frameNode.paddingLeft = 4;
    frameNode.paddingRight = 8;
    frameNode.paddingTop = 4;
    frameNode.paddingBottom = 8;
    expect(tailwindPadding(frameNode)).toEqual("pl-1 pr-2 pt-1 pb-2 ");

    frameNode.paddingLeft = 0;
    frameNode.paddingRight = 4;
    frameNode.paddingTop = 0;
    frameNode.paddingBottom = 4;
    expect(tailwindPadding(frameNode)).toEqual("pr-1 pb-1 ");

    frameNode.paddingLeft = 4;
    frameNode.paddingRight = 0;
    frameNode.paddingTop = 4;
    frameNode.paddingBottom = 0;
    expect(tailwindPadding(frameNode)).toEqual("pl-1 pt-1 ");

    frameNode.paddingLeft = 0;
    frameNode.paddingRight = 0;
    frameNode.paddingTop = 0;
    frameNode.paddingBottom = 0;
    expect(tailwindPadding(frameNode)).toEqual("");

    const notFrame = new AltRectangleNode();
    expect(tailwindPadding(notFrame)).toEqual("");
  });
});
