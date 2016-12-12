//
//  SellingTabTableViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/12/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase

class SellingTabTableViewController: UITableViewController {
    var databaseRef:   FIRDatabaseReference!
    var tagRef:        FIRDatabaseReference!
    var userRef:       FIRDatabaseReference!
    var storageRef:    FIRStorageReference!
    var itemImagesRef: FIRStorageReference!
    
    var currentlySelling: [FIRDataSnapshot]!
    var sellingTabCell = SellingTabTableViewCell()
    
    @IBAction func close(segue: UIStoryboardSegue) {}

    // MARK: - Overrides
    override func viewDidLoad() {
        super.viewDidLoad()
        currentlySelling = [FIRDataSnapshot]()
        databaseRef   = FIRDatabase.database().reference()
        storageRef    = FIRStorage.storage().reference()
        tagRef        = databaseRef.child("tags")
        itemImagesRef = storageRef.child("images/itemImages/")
        userRef       = databaseRef.child("users")

        populateList()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return currentlySelling.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellID = "SellCell"
        let row = indexPath.row
        let cell = tableView.dequeueReusableCell(withIdentifier: cellID, for: indexPath) as! SellingTabTableViewCell
        
        // Configure the cell...
        let item = currentlySelling[row].value as! NSDictionary
        let itemID = item["id"] as? String
        
        DispatchQueue.main.async(execute: {
            self.itemImagesRef.child(itemID!).child("imageOne").data(withMaxSize: 1 * 1024 * 1024) { (data, error) in
                if error != nil {
                    print("Something went wrong with the image: \(error?.localizedDescription)")
                    return
                } else {
                    cell.itemImage?.image = UIImage(data: data!)!
                }
            }
        })
        
        cell.itemTitle?.text = item["title"] as? String
        cell.itemPrice?.text = "$\(item["price"]!)"
        cell.itemDescription?.text = item["description"] as? String
        return cell
    }
    
    @IBAction func unwindPost (segue: UIStoryboardSegue) {
        let newListingVC    = segue.source as? NewListingTableViewController
        let itemTitle       = newListingVC?.itemTitle.currentAttributedTitle?.string
        let itemDescription = newListingVC?.itemDescription.currentAttributedTitle?.string
        let itemTags        = newListingVC?.tags.currentAttributedTitle?.string
        let itemHub         = newListingVC?.hubs.currentAttributedTitle?.string
        let itemImage       = newListingVC?.itemImage

        let itemPrice       = newListingVC?.price.currentAttributedTitle?.string
        let startIndex      = itemPrice?.index((itemPrice?.startIndex)!, offsetBy: 1)
        let truncatedPrice  = itemPrice?.substring(from: startIndex!)
        
        let itemID          = storeImage(imageView: itemImage!)
        
        let tagList         = itemTags?.components(separatedBy: ", ")
        incrementTagValues(tags: tagList!)
        
        let hubList         = itemHub?.components(separatedBy: ", ")
        let uid             = CustomFirebaseAuth().getCurrentUser()
        
        postNewListing(userID: uid, title: itemTitle!, itemDescription: itemDescription!, price: truncatedPrice!, itemID: itemID, tags: tagList!, hub: hubList!)
        
        self.tableView.reloadData()
    }
    
    func populateList () {
        let uid = CustomFirebaseAuth().getCurrentUser()
        databaseRef.child("itemsByUser").child(uid).observe(.childAdded, with: { (snapshot) -> Void in
            self.currentlySelling.append(snapshot)
            self.tableView.reloadData()
        })
    }
    
    func incrementTagValues(tags: [String]) {
        let uniqueTags = Array(Set(tags))
        
        for tag in uniqueTags {
            let tagRefHandle = tagRef.child(tag)
            tagRefHandle.observeSingleEvent (of: .value, with: { (snapshot) -> Void in
                if snapshot.exists() {
                    let value = snapshot.value as! Int
                    tagRefHandle.setValue(value + 1)
                } else {
                    tagRefHandle.setValue(1)
                }
            })
        }
    }
    
    func storeImage(imageView: UIImageView) -> String {
        let itemKey   = databaseRef.child("items").childByAutoId().key
        itemImagesRef = itemImagesRef.child("\(itemKey)/imageOne")
        
        if let uploadData = UIImagePNGRepresentation(imageView.image!) {
            itemImagesRef.put(uploadData, metadata: nil, completion: { (metadata, error) in
                if error != nil {
                    print("Something happened: \(error)")
                    return
                }
                print(metadata!)
            })

        }
        return itemKey
    }
    
    func postNewListing (userID: String, title: String, itemDescription: String, price: String, itemID: String, tags: [String], hub: [String]) {
        
        let currentDate = Date()
        let formatter = DateFormatter()
        formatter.dateFormat = "EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzz)"
        let convertedDate = formatter.string(from: currentDate)
        
        let item = ["date": "\(convertedDate)",
                    "description": itemDescription,
                    "favorites": [""],
                    "id": itemID,
                    "price": price,
                    "hubs": hub,
                    "tags": tags,
                    "title": title,
                    "uid": userID] as [String : Any]
        
        var childUpdates = ["/items/\(itemID)": item,
                            "/itemsByUser/\(userID)/\(itemID)/": item]
        
        for college in hub {
            childUpdates["/itemsByHub/\(college)/\(itemID)/"] = item
        }
        
        databaseRef.updateChildValues(childUpdates)
        userRef.child(userID)
               .child("itemsForSale")
               .child(itemID)
               .setValue(true);
        
        print("item posted to database")
    }
}
