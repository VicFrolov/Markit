//
//  LGHorizontalLinearFlowLayout.swift
//  Markit
//
//  Created by Trixie on 12/15/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

public class LGHorizontalLinearFlowLayout: UICollectionViewFlowLayout {
    
    private var lastCollectionViewSize: CGSize = CGSize.zero
    public var scalingOffset: CGFloat = 110
    public var minimumScaleFactor: CGFloat = 0.5
    public var scaleItems: Bool = true
    
    static func configureLayout(collectionView: UICollectionView, itemSize: CGSize, minimumLineSpacing: CGFloat) -> LGHorizontalLinearFlowLayout {
        
        let layout = LGHorizontalLinearFlowLayout()
        layout.scrollDirection = .horizontal
        layout.minimumLineSpacing = minimumLineSpacing
        layout.itemSize = itemSize
        
        collectionView.decelerationRate = UIScrollViewDecelerationRateFast
        collectionView.collectionViewLayout = layout
        
        return layout
    }
    
    override public func invalidateLayout(with context: UICollectionViewLayoutInvalidationContext) {
        super.invalidateLayout(with: context)
        
        if self.collectionView == nil {
            return
        }
        
        let currentCollectionViewSize = self.collectionView!.bounds.size
        
        if !currentCollectionViewSize.equalTo(self.lastCollectionViewSize) {
            self.configureInset()
            self.lastCollectionViewSize = currentCollectionViewSize
        }
    }
    
    private func configureInset() -> Void {
        if self.collectionView == nil {
            return
        }
        
        let inset = self.collectionView!.bounds.size.width / 2 - self.itemSize.width / 2
        self.collectionView!.contentInset = UIEdgeInsetsMake(0, inset, 0, inset)
        self.collectionView!.contentOffset = CGPoint(x: -inset, y: 0)
    }
    
    public override func targetContentOffset(forProposedContentOffset proposedContentOffset: CGPoint, withScrollingVelocity velocity: CGPoint) -> CGPoint {
        if self.collectionView == nil {
            return proposedContentOffset
        }
        
        let collectionViewSize = self.collectionView!.bounds.size
        let proposedRect = CGRect(x: proposedContentOffset.x, y: 0, width: collectionViewSize.width, height: collectionViewSize.height)
        
        let layoutAttributes = self.layoutAttributesForElements(in: proposedRect)
        
        if layoutAttributes == nil {
            return proposedContentOffset
        }
        
        var candidateAttributes: UICollectionViewLayoutAttributes?
        let proposedContentOffsetCenterX = proposedContentOffset.x + collectionViewSize.width / 2
        
        for attributes: UICollectionViewLayoutAttributes in layoutAttributes! {
            if attributes.representedElementCategory != .cell {
                continue
            }
            
            if candidateAttributes == nil {
                candidateAttributes = attributes
                continue
            }
            
            if fabs(attributes.center.x - proposedContentOffsetCenterX) < fabs(candidateAttributes!.center.x - proposedContentOffsetCenterX) {
                candidateAttributes = attributes
            }
        }
        
        if candidateAttributes == nil {
            return proposedContentOffset
        }
        
        var newOffsetX = candidateAttributes!.center.x - self.collectionView!.bounds.size.width / 2
        
        let offset = newOffsetX - self.collectionView!.contentOffset.x
        
        if (velocity.x < 0 && offset > 0) || (velocity.x > 0 && offset < 0) {
            let pageWidth = self.itemSize.width + self.minimumLineSpacing
            newOffsetX += velocity.x > 0 ? pageWidth : -pageWidth
        }
        
        return CGPoint(x: newOffsetX, y: proposedContentOffset.y)
    }
    
    public override func shouldInvalidateLayout(forBoundsChange newBounds: CGRect) -> Bool {
        return true
    }
}
