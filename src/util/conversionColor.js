import {
  Color3,
  Color4
} from "@babylonjs/core"

export function conversionColorHex(hex, opacity) {
  const r = parseInt("0x" + hex.slice(1, 3))
  const g = parseInt("0x" + hex.slice(3, 5))
  const b = parseInt("0x" + hex.slice(5, 7))
  if (opacity || opacity === 0) {
    return new Color4(r / 255, g / 255, b / 255, opacity)
  } else {
    return new Color3(r / 255, g / 255, b / 255)
  }
}