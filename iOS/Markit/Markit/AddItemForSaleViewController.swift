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
    
    func postNewListing(userID: String, username: String, item: String, price: Int) {
        let key = ref.child("posts").childByAutoId().key
        let item = ["uid": userID,
                    "seller": username,
                    "item": item,
                    "price": price] as [String : Any]
        let childUpdates = ["/items/\(key)": item,
                            "/saleItemsByUser/\(userID)/\(key)/": item]
        ref.updateChildValues(childUpdates)
        print("item posted to database")
    }
    
    
    @IBAction func didTapPost(_ sender: AnyObject) {
        postNewListing(userID: "1993910", username: "Vic", item: "ball of wax", price: 69)
    }
    
    

    override func viewDidLoad() {
        super.viewDidLoad()
        self.ref = FIRDatabase.database().reference()
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
