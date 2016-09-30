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
    var items: Array<JSON> = []

    override func viewDidLoad() {
        super.viewDidLoad()
        ref = FIRDatabase.database().reference()
        displayListing()
        
    }
    
    func displayListing() {
        refHandle = ref.observe(.childAdded, with: { (snapshot) -> Void in
            
            print("Here are the children \(snapshot.children)")
            
            let jsonSnap = JSON(snapshot.value)
            print("HERE IS THE JSON \(jsonSnap)")
            
            self.items.append(jsonSnap)
            
            print("COUNT \(self.items.count)")
            
//            for item in snapshot.children {
//                print("Here is the snapshot \(jsonSnap["items"])")
//                let child = JSON(item)
//                print("Child is \(child)")
//                self.items.append(child)
//                //                let dict = child.value
//                //                listings.append(dict as! NSDictionary)
//            }
            
            self.tableView.reloadData()
            
        })
        
//        for item in self.items as! Dictionary<String, AnyObject> {
//            let seller = item["seller"] as! String
//            let itemName = item[""] as! String
//        }
        

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
        print(self.items.count)
        return self.items.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "Cell"
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier,
                                                 for: indexPath) as! ListingsTableViewCell
        // Configure the cell...
        cell.itemLabel?.text = sampleItems[indexPath.row]
        cell.thumbnailImageView?.image = UIImage(named: restaurantImages[indexPath.row])
        return cell
    }
}
