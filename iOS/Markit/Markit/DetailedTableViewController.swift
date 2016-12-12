//
//  DetailedTableViewController.swift
//  Markit
//
//  Created by Trixie on 12/7/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import FontAwesome_swift

class DetailedViewController: UIViewController {
    
    var currentItem: Item!
    @IBOutlet weak var detailedView: DetailedView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("HERE in DetailedView")
        self.title = self.currentItem.title
        
        detailedView.itemImageView?.image  = self.currentItem.image!
        detailedView.itemTitle?.text       = self.currentItem.title
        detailedView.itemPrice?.text       = "$\(self.currentItem.price!)"
        detailedView.itemDescription?.text = self.currentItem.desc!
//        detailedView.itemTags.             = self.currentItem.tags
//        detailedView.itemHubs             = self.currentItem.hubs
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "newMessageSegue" {
            let messageVC = segue.destination as! ChatMessageViewController
            messageVC.senderId          = CustomFirebaseAuth().getCurrentUser()
            messageVC.itemID            = self.currentItem.imageID
            messageVC.otherUserID       = self.currentItem.uid
            messageVC.otherUserName     = self.currentItem.username
            //        mesageVC.
        }
    }

}
