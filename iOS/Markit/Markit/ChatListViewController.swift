//
//  ChatViewController.swift
//  Markit
//
//  Created by Trixie on 11/29/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase
import PromiseKit

class ChatListViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet weak var chatTableView: UITableView!
    
    var conversationKeys  = [String]()
    var conversationsList = [Conversation]()
    var databaseRef:        FIRDatabaseReference!
    var userRef:            FIRDatabaseReference!
    var chatRef:            FIRDatabaseReference!
    var itemRef:            FIRDatabaseReference!
    var currentUser:        String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        currentUser = CustomFirebaseAuth().getCurrentUser()
        
        databaseRef = FIRDatabase.database().reference()
        userRef     = databaseRef.child("users/\(currentUser!)")
        chatRef     = userRef.child("chats")
        itemRef     = databaseRef.child("items")
        
        chatTableView.delegate = self
        chatTableView.dataSource = self
        
        getMessages()
        
//        conversationsList.sort (by: { $0.lastSent?.compare($1.lastSent!) == .orderedAscending } )
        
        chatTableView.reloadData()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func getMessages() {
        chatRef.observe(.value, with: { (snapshot) -> Void in
            self.conversationsList = [Conversation]()
            let convoDictWithKeys = snapshot.value as! NSDictionary
            
            for key in convoDictWithKeys.allKeys {
                let convoDict         = convoDictWithKeys[key] as! NSDictionary
                
                let conversation      = Conversation()
                conversation.context  = convoDict["context"] as? NSDictionary
                self.getItemTitle(itemID: (conversation.context?["itemID"] as! String?)!, conversation: conversation)
                conversation.messages = convoDict["messages"] as? NSDictionary
                conversation.lastSent = Date().parse(dateString: (conversation.context?["latestPost"] as! String?)!)
                
                self.conversationsList.append(conversation)
            }
            self.chatTableView.reloadData()
        })
    }
    
    // MARK: - Table view data source
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return conversationsList.count
    }
    
    func getItemTitle(itemID: String, conversation: Conversation) {
        itemRef.child(itemID).child("title").observeSingleEvent(of: .value, with: { (snapshot) -> Void in
            conversation.itemTitle = snapshot.value as! String?
        })
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellID = "ChatCell"
        let row = indexPath.row
        let cell   = tableView.dequeueReusableCell(withIdentifier: cellID, for: indexPath) as! ChatTableViewCell
        
        let defaultImage          = "https://media.giphy.com/media/mtaWx98w7mX7y/giphy-facebook_s.jpg"
        
        let conversation          = conversationsList[row]
        let context               = conversation.context!
        let messages              = conversation.messages!
        let lastMessageKey        = messages.allKeys[messages.count - 1] as! String
        let latestMessage         = messages[lastMessageKey] as! NSDictionary
        let latestMessageText     = latestMessage["text"]
        
        cell.chatUsername?.text       = context["otherUsername"] as! String?
        cell.lastSent?.text           = context["latestPost"] as! String?
        cell.chatMessagePreview?.text = latestMessageText as! String?
        cell.itemTitle?.text          = conversation.itemTitle!
        
        let itemImageURL              = context["itemImageURL"] as? String ?? defaultImage
        
        if let url = URL(string: itemImageURL) {
            if let data = NSData(contentsOf: url as URL) {
                cell.chatImageView?.image = UIImage(data: data as Data)
                
                // Change images to circles
                cell.chatImageView.layer.borderWidth = 1.0
                cell.chatImageView.layer.masksToBounds = false
                cell.chatImageView.layer.borderColor = UIColor.white.cgColor
                cell.chatImageView.layer.cornerRadius = cell.chatImageView.frame.height / 2
                cell.chatImageView.clipsToBounds = true
            }
        }
        
        return cell
    }

    // MARK: - Table view delegate
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        chatTableView.deselectRow(at: indexPath, animated: true)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "viewRecentMessageSegue" {
            
            if let indexPath = chatTableView.indexPathForSelectedRow {
                let selectedRow         = indexPath.row
                let selectedConvo       = conversationsList[selectedRow]
                let context             = selectedConvo.context
                let messageVC           = segue.destination as! ChatMessageViewController
                
                messageVC.context       = context?["conversationID"] as! String?
                messageVC.senderId      = currentUser
                messageVC.itemID        = context?["itemID"] as! String?
                messageVC.otherUserID   = context?["otherUser"] as! String?
                
                let otherUserDefaultValue = context?["otherUser"] as! String?
                
                messageVC.otherUserName = context?["otherUsername"] as! String? ?? otherUserDefaultValue
            }
        }
    }
}
