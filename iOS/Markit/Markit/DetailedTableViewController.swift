//
//  DetailedTableViewController.swift
//  Markit
//
//  Created by Trixie on 12/13/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
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

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setHeartImage()
        
        print("HERE in DetailedView")
        self.title = self.currentItem.title
                
        itemImageView?.image  = self.currentItem.image!
        itemTitle?.text       = self.currentItem.title
        itemPrice?.text       = "$\(self.currentItem.price!)"
        itemDescription?.text = self.currentItem.desc!
        itemTags?.text        = self.currentItem.tags?.joined(separator: ", ")
        itemHubs?.text        = self.currentItem.hubs?.joined(separator: ", ")
        
        messageSellerButton.layer.cornerRadius = 20
    }
    
    func setHeartImage() {
        let emptyHeart = UIImage.fontAwesomeIcon(name: FontAwesome.heartO, textColor: UIColor.gray, size: CGSize(width: 35, height: 35))
        faved.setImage(emptyHeart, for: .normal)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "newMessageSegue" {
            let messageVC = segue.destination as! ChatMessageViewController
            messageVC.senderId          = CustomFirebaseAuth().getCurrentUser()
            messageVC.itemID            = self.currentItem.imageID
            messageVC.otherUserID       = self.currentItem.uid
            messageVC.otherUserName     = self.currentItem.username
            messageVC.itemTitle         = self.currentItem.title
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
