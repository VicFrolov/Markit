//
//  AddItemForSaleViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/15/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase

class AddItemForSaleViewController: UIViewController {
    var ref: FIRDatabaseReference!
    
    func postNewListing(userID: String, title: String, itemDescription: String, price: String, itemID: String, tags: String, hub: String) {
        let key = ref.child("items").childByAutoId().key

        let currentDate = Date()
        let formatter = DateFormatter()
        formatter.dateFormat = "EEE MMM dd yyyy HH:mm:ss ZZZ"
        let convertedDate = formatter.string(from: currentDate)
        
        let item = ["date": "\(convertedDate)",
                    "description": itemDescription,
                    "favorites": [],
                    "id": itemID,
                    "price": price,
                    "tags": tags,
                    "title": title,
                    "uid": userID] as [String : Any]
        
        let childUpdates = ["/items/\(key)": item,
                            "/itemsByUser/\(userID)/\(key)/": item,
                            "/itemsByHub/\(hub)": item]
        
        ref.updateChildValues(childUpdates)
        print("item posted to database")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.ref = FIRDatabase.database().reference()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}
