//
//  DetailedTableViewController.swift
//  Markit
//
//  Created by Trixie on 12/13/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase
import FontAwesome_swift

class DetailedTableViewController: UITableViewController {
    
    var currentItem: Item!
    
    @IBOutlet weak var itemImageView: UIImageView!
    @IBOutlet weak var itemPrice: UILabel!
    @IBOutlet weak var itemTitle: UILabel!
    @IBOutlet weak var itemDescription: UILabel!
    @IBOutlet weak var itemTags: UILabel!
    @IBOutlet weak var itemHubs: UILabel!
    @IBOutlet weak var messageSellerButton: UIButton!
    @IBOutlet weak var faved: UIButton!
    
    var databaseRef: FIRDatabaseReference!
    var userRef: FIRDatabaseReference!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.setHeartImage()
        self.setupReferences()
        
        self.title = self.currentItem.title
        
        self.itemImageView?.image  = self.currentItem.image!
        self.itemTitle?.text       = self.currentItem.title
        self.itemPrice?.text       = "$\(self.currentItem.price!)"
        self.itemDescription?.text = self.currentItem.desc!
        self.itemTags?.text        = self.currentItem.tags?.joined(separator: ", ")
        self.itemHubs?.text        = self.currentItem.hubs?.joined(separator: ", ")
        
        messageSellerButton.layer.cornerRadius = 20
    }
    
    func setupReferences () {
        self.databaseRef      = FIRDatabase.database().reference()
        self.userRef          = self.databaseRef.child("users")

    }
    
    func setHeartImage() {
        let emptyHeart = UIImage.fontAwesomeIcon(name: FontAwesome.heartO, textColor: UIColor.gray, size: CGSize(width: 35, height: 35))
        faved.setImage(emptyHeart, for: .normal)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "newMessageSegue" {
            let messageVC = segue.destination as! ChatMessageViewController
            let userID                  = CustomFirebaseAuth().getCurrentUser()
            messageVC.senderId          = userID
            messageVC.itemID            = self.currentItem.imageID
            messageVC.otherUserID       = self.currentItem.uid
            messageVC.otherUserName     = self.currentItem.username
            messageVC.itemTitle         = self.currentItem.title
            
            self.userRef.child(userID)
                .child("username")
                .observeSingleEvent(of: .value, with: { (snapshot) -> Void in
                    messageVC.senderDisplayName = snapshot.value as! String?
                    
                })
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
