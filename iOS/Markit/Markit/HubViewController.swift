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
    
    var stringArray = [Item]()
    var selectedCell: Int! = 0
    var firstName: String!, hub: String!
    
    var ref: FIRDatabaseReference!
    var itemsRef : FIRDatabaseReference!
    var itemImageRef : FIRStorageReference!

    
    override func viewDidLoad() {
        super.viewDidLoad()
        makeNavBarInvis()
        
        ref = FIRDatabase.database().reference()
        itemsRef = ref.child("items")
        itemImageRef = FIRStorage.storage().reference()
        
        fetchItems()
        fetchName()
        
        collectionView.showsHorizontalScrollIndicator = false
        collectionView.isPagingEnabled = false
        
        selectedCell = 0
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5){
            self.collectionViewLayout = LGHorizontalLinearFlowLayout
                .configureLayout(self.collectionView, itemSize: CGSize(width: 90, height: 90), minimumLineSpacing: 10)
        }
    }
    
    func fetchName() {
        let userID = FIRAuth.auth()?.currentUser?.uid
        
        if FIRAuth.auth()?.currentUser != nil {
            ref.child("users").child(userID!).observeSingleEvent(of: .value, with: { (snapshot) in
                let value = snapshot.value as? NSDictionary
                self.firstName = value?["firstName"] as? String ?? ""
                self.hub = value?["userHub"] as? String ?? ""
                
            }) { (error) in
                print(error.localizedDescription)
            }
            
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5){
                self.greetingNameLabel.text    = "Hi, \(self.firstName!)"
                self.greetingMessageLabel.text = "Here's whats going on at \(self.hub!)"
                self.collectionView.reloadData()
            }
        } else {
            greetingNameLabel.text    = "Welcome!"
            greetingMessageLabel.text = "Here's whats going on around you."
        }
    }
    
    func fetchItems() {
        self.itemsRef!.queryOrdered(byChild: "title")
            .observe(.childAdded, with: { (snapshot) -> Void in
                
                if let dictionary = snapshot.value as? [String: AnyObject] {
                    
                    let item = Item()
                    item.title = dictionary["title"] as! String?
                    item.imageID = dictionary["id"] as! String?
                    self.getImage(imageID: item.imageID!, item: item)
                    self.stringArray.append(item)
                    
                }
            })
        
    }
    
    func getImage (imageID: String, item: Item) {
        itemImageRef!.child("images/itemImages/\(imageID)/imageOne").data(withMaxSize: 1 * 2048 * 2048) { (data, error) in
            DispatchQueue.main.async(execute: {
                if (error != nil) {
                    print("Image download failed: \(error?.localizedDescription)")
                    return
                }
                
                item.image = UIImage(data: data!)
                return
            })
        }
    }
    
    func collectionView(collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAtIndexPath indexPath: NSIndexPath) -> CGSize {
        return CGSize(width: 500, height: 500);
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return stringArray.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "collectionCell", for: indexPath)
            as! collectionViewCell
        
        cell.label.text = stringArray[(indexPath as NSIndexPath).item].title
        
        cell.layer.shouldRasterize = true;
        cell.layer.rasterizationScale = UIScreen.main.scale
        
        if(selectedCell != nil){
            if((indexPath as NSIndexPath).item == selectedCell){
                cell.image.image = stringArray[(indexPath as NSIndexPath).item].image
                cell.label.textColor = UIColor.white
            }
            else{
                cell.image.image = stringArray[(indexPath as NSIndexPath).item].image
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
        
        if(index != nil){
            for cell in self.collectionView.visibleCells   {
                let currentCell = cell as! collectionViewCell
                currentCell.image.image = stringArray[(index as IndexPath!).item].image
                currentCell.label.textColor = UIColor.black
            }
            
            let cell = collectionView.cellForItem(at: index!) as? collectionViewCell
            if(cell != nil){
                cell!.image.image = stringArray[(index as IndexPath!).item].image
                selectedCell = (collectionView.indexPath(for: cell!) as NSIndexPath?)?.item
                self.countLabel.text = stringArray[selectedCell!].title
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
