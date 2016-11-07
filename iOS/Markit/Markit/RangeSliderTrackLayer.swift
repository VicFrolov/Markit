//
//  RangeSliderTrackLayer.swift
//  Markit
//
//  Created by Trixie on 11/6/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import QuartzCore

class RangeSliderTrackLayer: CALayer {
    weak var rangeSlider: CustomSliderControl?
    
    override func draw(in ctx: CGContext) {
        if let slider = rangeSlider {
            let cornerRadius = bounds.height * slider.curvaceousness / 2.0
            let path = UIBezierPath(roundedRect: bounds, cornerRadius: cornerRadius)
            ctx.addPath(path.CGPath)
            
            CGContextSetFillColorWithColor(ctx, slider.trackTintColor.cgColor)
            CGContextAddPath(ctx, path.cgPath)
            ctx.fillPath()
            
            CGContextSetFillColor(ctx, slider.trackHighlightTintColor.cgColor)
            let lowerValuePosition = CGFloat(slider.positionForValue(value: slider.lower))
            let upperValuePosition = CGFloat(slider.positionForValue(value: slider.upper))
            let rect = CGRect(x: lowerValuePosition, y: 0.0, width: upperValuePosition - lowerValuePosition, height: bounds.height)
            ctx.fill(rect)
        }
    }
}
