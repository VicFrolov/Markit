//
//  HubViewController.swift
//  Markit
//
//  Created by Bryan Ku on 12/15/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import FirebaseStorage
import FirebaseAuth
import FirebaseDatabase

class HubViewController: UIViewController, UICollectionViewDataSource, UICollectionViewDelegate {
    
    @IBOutlet weak var greetingMessageLabel: UILabel!
    @IBOutlet weak var greetingNameLabel: UILabel!
    @IBOutlet var collectionView: UICollectionView!
    @IBOutlet var label: UILabel!
    @IBOutlet var countLabel: UILabel!
    
    fileprivate var collectionViewLayout: LGHorizontalLinearFlowLayout!
    
    var stringArray: [String] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    var selectedCell: Int! = 0
    var ref: FIRDatabaseReference!
    var firstName: String!, hub: String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        makeNavBarInvis()
        
        ref = FIRDatabase.database().reference()
        let userID = FIRAuth.auth()?.currentUser?.uid
        
        if FIRAuth.auth()?.currentUser != nil {
            ref.child("users").child(userID!).observeSingleEvent(of: .value, with: { (snapshot) in
                let value = snapshot.value as? NSDictionary
                self.firstName = value?["firstName"] as? String ?? ""
                self.hub = value?["userHub"] as? String ?? ""
                
            }) { (error) in
                print(error.localizedDescription)
            }
            greetingNameLabel.text    = "Hi, \(firstName)"
            greetingMessageLabel.text = "Here's whats going on at \(hub)"
        } else {
            greetingNameLabel.text    = "Welcome!"
            greetingMessageLabel.text = "Here's whats going on around you."
        }
        
        collectionView.showsHorizontalScrollIndicator = false
        collectionView.isPagingEnabled = false
        
        selectedCell = 0
        
        self.collectionViewLayout = LGHorizontalLinearFlowLayout
            .configureLayout(self.collectionView, itemSize: CGSize(width: 90, height: 90), minimumLineSpacing: 10)
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return stringArray.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "collectionCell", for: indexPath)
            as! collectionViewCell
        
        cell.label.text = stringArray[(indexPath as NSIndexPath).item]
        
        cell.layer.shouldRasterize = true;
        cell.layer.rasterizationScale = UIScreen.main.scale
        
        if(selectedCell != nil){
            if((indexPath as NSIndexPath).item == selectedCell){
                cell.image.image = UIImage(named: "FullCircle")!
                cell.label.textColor = UIColor.white
            }
            else{
                cell.image.image = UIImage(named: "EmptyCircle")!
                cell.label.textColor = UIColor.black
            }
        }
        
        return cell
    }
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        findCenterIndex(scrollView)
    }
    
    func findCenterIndex(_ scrollView: UIScrollView) {
        let collectionOrigin = collectionView!.bounds.origin
        let collectionWidth = collectionView!.bounds.width
        var centerPoint: CGPoint!
        var newX: CGFloat!
        if collectionOrigin.x > 0 {
            newX = collectionOrigin.x + collectionWidth / 2
            centerPoint = CGPoint(x: newX, y: collectionOrigin.y)
        } else {
            newX = collectionWidth / 2
            centerPoint = CGPoint(x: newX, y: collectionOrigin.y)
        }
        
        let index = collectionView!.indexPathForItem(at: centerPoint)
        let cell = collectionView!.cellForItem(at: IndexPath(item: 0, section: 0)) as? collectionViewCell
        
        if(index != nil){
            for cell in self.collectionView.visibleCells   {
                let currentCell = cell as! collectionViewCell
                currentCell.image.image = UIImage(named: "EmptyCircle")!
                currentCell.label.textColor = UIColor.black
            }
            
            let cell = collectionView.cellForItem(at: index!) as? collectionViewCell
            if(cell != nil){
                cell!.image.image = UIImage(named: "FullCircle")!
                selectedCell = (collectionView.indexPath(for: cell!) as NSIndexPath?)?.item
                self.countLabel.text = stringArray[selectedCell!]
            }
        }
        else if(cell != nil){
            let actualPosition = scrollView.panGestureRecognizer.translation(in: scrollView.superview)
            for cellView in self.collectionView.visibleCells   {
                let currentCell = cellView as? collectionViewCell
                currentCell!.image.image = UIImage(named: "EmptyCircle")!
                currentCell!.label.textColor = UIColor.black
                
                if(currentCell == cell! && (selectedCell == 0 || selectedCell == 1) && actualPosition.x > 0){
                    cell!.image.image = UIImage(named: "FullCircle")!
                    selectedCell = (collectionView.indexPath(for: cell!) as NSIndexPath?)?.item
                    self.countLabel.text = stringArray[selectedCell!]
                }
            }
        }
    }
    func makeNavBarInvis() {
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: .default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.isTranslucent = true
        self.navigationController?.view.backgroundColor = UIColor.clear
        self.navigationController?.navigationBar.tintColor = UIColor.black
        navigationItem.backBarButtonItem = UIBarButtonItem(title: "", style: .plain, target: nil, action: nil)
    }
}

class collectionViewCell: UICollectionViewCell {
    @IBOutlet var label: UILabel!
    @IBOutlet var image: UIImageView!
}
