//
//  SellingViewController.swift
//  Markit
//
//  Created by Bryan Ku on 11/30/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import FirebaseDatabase
import FirebaseAuth
import FirebaseStorage

class SellingListViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    @IBOutlet weak var tableView: UITableView!
    var items = [String]()
    var itemsForSale : NSDictionary!
    var itemsFromDatabase : NSDictionary!
    var ref: FIRDatabaseReference!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        print("fASFSS \(items) ")
        self.tableView.reloadData()
        ref = FIRDatabase.database().reference()
        let userID = FIRAuth.auth()?.currentUser?.uid
        
        ref.child("users/\(userID!)/itemsForSale").observeSingleEvent(of: .value, with: { (snapshot) in
            self.itemsForSale = snapshot.value as? NSDictionary
            
            self.ref.child("items/").observeSingleEvent(of: .value, with: { (snapshot) in
                self.itemsFromDatabase = snapshot.value as? NSDictionary
                
                for (keyFavItems, _) in self.itemsForSale! {
                    for (keyItemsFD, _) in self.itemsFromDatabase! {
                        if keyFavItems as! String == keyItemsFD as! String{
                            let dictItem = self.itemsFromDatabase![keyItemsFD] as! NSDictionary
                            print(dictItem["title"]! as! String)
                            self.items.append(dictItem["title"] as! String)
                        }
                    }
                }
                
            }) { (error) in
                print(error.localizedDescription)
            }
            
        }) { (error) in
            print(error.localizedDescription)
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        DispatchQueue.main.async{
            self.tableView.reloadData()
        }
    }
    
    private func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return items.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "itemCell", for: indexPath) as! SellingListTableViewCell
        
        let itemName = items[indexPath.row]
        cell.itemNameLabel?.text = itemName
        cell.itemImageView?.image = UIImage(named: itemName)
        
        return cell
    }
    
}
