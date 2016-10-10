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
    var key: String!
    var itemList: [Item] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        self.ref = FIRDatabase.database().reference()
        self.itemsRef = ref.child("mockup-post")
        self.userRef = ref.child("users")
        fetchItems()
    }
    
    func fetchItems () {
        refHandle = itemsRef!.observe(.childAdded, with: { (snapshot) -> Void in
//            print("VALUE \(snapshot.children.allObjects)")
//            print ("JSON \(JSON(snapshot.value))")
//            self.key = snapshot.key
//            
//            print("ITEMS \(self.items)")
//            print("key \(snapshot.key)")
//            print("children \(snapshot.children)")
//            
//            for item in snapshot.children.allObjects as! [FIRDataSnapshot] {
//                newItems.append(item)
//            }
            
            if let dictionary = snapshot.value as? [String: AnyObject] {
                print("The dict is \(dictionary)")
                
                let item = Item()
                item.uid = dictionary["uid"] as! String?
//                item.username = dictionary["seller"] as! String?
                item.price = dictionary["price"] as! String?
                item.label = dictionary["item"] as! String?
                item.tags = dictionary["tags"] as! String?
                item.desc = dictionary["description"] as! String?
                
                self.itemList.append(item)
            }
            self.tableView.reloadData()
        })
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        self.tableView.reloadData()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.itemList.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "Cell"
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier,
                                                 for: indexPath) as! ListingsTableViewCell
        // Configure the cell...
        cell.itemLabel?.text = itemList[indexPath.row].label
//        cell.thumbnailImageView?.image = UIImage(named: restaurantImages[indexPath.row])
        cell.priceLabel?.text = itemList[indexPath.row].price
//        cell.userLabel?.text = itemList[indexPath.row].username
        return cell
    }
}
