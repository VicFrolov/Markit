//
//  ListingsTableViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/10/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase
import SwiftyJSON

class ListingsTableViewController: UITableViewController {
    var sampleItems = ["Xbox", "Table", "Golf Clubs", "iPhone 6s Plus", "blablabla", "blebleblo"]
    var restaurantImages = ["cafedeadend.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg"]
    var ref: FIRDatabaseReference!
    var refHandle: FIRDatabaseHandle?
    var itemsRef: FIRDatabaseReference!
    var userRef: FIRDatabaseReference!
    var items: JSON!
    var key: String!

    override func viewDidLoad() {
        super.viewDidLoad()
        self.ref = FIRDatabase.database().reference()
        self.itemsRef = ref.child("items")
        self.userRef = ref.child("users")
        
        self.refHandle = itemsRef!.observe(.childAdded, with: { (snapshot) -> Void in
            
            let jsonSnap = JSON(snapshot.value!)
            self.key = snapshot.key
            self.items = jsonSnap
            
            print("ITEMS \(self.items!)")
            print("key \(snapshot.key)")
            print("self \(self.items["seller"])")
            
//            print("KEY \(snapshot.key)")
//            print("HERE IS THE JSON \(jsonSnap)")
//            self.dict.append(["key": jsonSnap])
//            
//            print("listings \(self.dict)")
//            print("COUNT \(self.dict.count)")
            
            //            for item in snapshot.children.allObjects as! [FIRDataSnapshot] {
            ////                let seller = item.value!["seller"] as? String
            //
            //                print("ITEM \(item)")
            //                self.items.append(item)
            //
            //                print("COUNT \(self.items.count)")
            
            //                print("Here is the snapshot \(jsonSnap["items"])")
            //                let child = JSON(item)
            //                print("Child is \(child)")
            //                self.items.append(child)
            
        })
        
        self.tableView.reloadData()

    }
    
    override func viewWillAppear(_ animated: Bool) {
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return sampleItems.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "Cell"
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier,
                                                 for: indexPath) as! ListingsTableViewCell
        // Configure the cell...
//        cell.itemLabel?.text = sampleItems[indexPath.row]
        cell.thumbnailImageView?.image = UIImage(named: restaurantImages[indexPath.row])
//        cell.priceLabel?.text = self.items!["price"].string
//        cell.userLabel?.text = self.items!["seller"].string
//        cell.itemLabel?.text = self.items!["item"].string
        return cell
    }
}
