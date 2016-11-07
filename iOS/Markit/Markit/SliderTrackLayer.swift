//
//  RangeSliderTrackLayer.swift
//  Markit
//
//  Created by Trixie on 11/6/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class SliderTrackLayer: CALayer {
    weak var rangeSlider: ListingsAdvancedSearchSliderController?
    
    override func draw(in ctx: CGContext) {
        if let slider = rangeSlider {
            let cornerRadius = bounds.height * slider.curvaceousness / 2.0
            let path = UIBezierPath(roundedRect: bounds, cornerRadius: cornerRadius)
            ctx.addPath(path.cgPath)
            
            // Fill the track
            ctx.setFillColor(slider.trackTintColor.cgColor)
            ctx.addPath(path.cgPath)
            ctx.fillPath()
            
            // Fill the highlighted range
            ctx.setFillColor(slider.trackHighlightTintColor.cgColor)
            let lowerValuePosition = CGFloat(slider.positionForValue(value: slider.lower))
            let upperValuePosition = CGFloat(slider.positionForValue(value: slider.upper))
            let rect = CGRect(x: lowerValuePosition, y: 0.0, width: upperValuePosition - lowerValuePosition, height: bounds.height)
            ctx.fill(rect)
        }
    }
}
