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
    var databaseRef: FIRDatabaseReference!
    var storageRef: FIRStorageReference!
    var itemImagesRef: FIRStorageReference!
    
    @IBAction func close(segue: UIStoryboardSegue) {}

    override func viewDidLoad() {
        super.viewDidLoad()
        databaseRef   = FIRDatabase.database().reference()
        storageRef    = FIRStorage.storage().reference()
        itemImagesRef = storageRef.child("images/itemImages/")
        
        self.tableView.delegate = self
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 0
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return 0
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
        
        let imageID         = storeImage(imageView: itemImage!)
        
        let tagList         = itemTags?.components(separatedBy: ", ")
        let hubList         = itemHub?.components(separatedBy: ", ")
        let uid             = getCurrentUser()
        
        // Will probably be async since picture needs to be uploaded first
        postNewListing(userID: uid, title: itemTitle!, itemDescription: itemDescription!, price: truncatedPrice!, itemImageID: imageID, tags: tagList!, hub: hubList!)
    }
    
    func storeImage(imageView: UIImageView) -> String {
        let imageKey   = databaseRef.child("items").childByAutoId().key
        itemImagesRef = itemImagesRef.child("\(imageKey)/imageOne")
        
        if let uploadData = UIImagePNGRepresentation(imageView.image!) {
            itemImagesRef.put(uploadData, metadata: nil, completion: { (metadata, error) in
                if error != nil {
                    print("Something happened: \(error)")
                    return
                }
                print(metadata)
            })

        }
        return imageKey
    }
    
    func postNewListing (userID: String, title: String, itemDescription: String, price: String, itemImageID: String, tags: [String], hub: [String]) {
        let itemKey = databaseRef.child("items").childByAutoId().key
        
        let currentDate = Date()
        let formatter = DateFormatter()
        formatter.dateFormat = "EEE MMM dd yyyy HH:mm:ss zzz"
        let convertedDate = formatter.string(from: currentDate)
        
        let item = ["date": "\(convertedDate)",
            "description": itemDescription,
            "favorites": [],
            "id": itemImageID,
            "price": price,
            "hubs": hub,
            "tags": tags,
            "title": title,
            "uid": userID] as [String : Any]
        
        var childUpdates = ["/items/\(itemKey)": item,
                            "/itemsByUser/\(userID)/\(itemKey)/": item]
        
        for college in hub {
            childUpdates["/itemsByHub/\(college)/\(itemKey)/"] = item
        }
        
        databaseRef.updateChildValues(childUpdates)
        print("item posted to database")
    }

    func getCurrentUser () -> String {
        let user = FIRAuth.auth()?.currentUser
        return (user?.uid)!
    }

    /*
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "reuseIdentifier", for: indexPath)

        // Configure the cell...

        return cell
    }
    */

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
