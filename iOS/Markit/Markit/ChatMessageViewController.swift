//
//  ChatMessageViewController.swift
//  Markit
//
//  Created by Trixie on 11/30/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase
import JSQMessagesViewController

final class ChatMessageViewController: JSQMessagesViewController {
    
    var ref:         FIRDatabaseReference!
    var userRef:     FIRDatabaseReference!
    var chatRef:     FIRDatabaseReference!
    var messagesRef: FIRDatabaseReference!
    
    var outgoingBubbleImageView = JSQMessagesBubbleImageFactory().outgoingMessagesBubbleImage(with: UIColor.jsq_messageBubbleBlue())
    var incomingBubbleImageView = JSQMessagesBubbleImageFactory().outgoingMessagesBubbleImage(with: UIColor.jsq_messageBubbleLightGray())
    var messages                = [JSQMessage]()
    var itemID:        String!
    var otherUserID:   String!
    var otherUserName: String!
    var context:       String!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.ref         = FIRDatabase.database().reference()
        self.userRef     = ref.child("users")
                              .child(self.senderId)
        self.chatRef     = userRef.child("chats")
        self.messagesRef = chatRef.child(self.itemID).child("messages")
        
        self.userRef.child("username").observe(.value, with: { (snapshot) -> Void in
            self.senderDisplayName = snapshot.value as! String
        })
        
        setupNavBar()
        observeConversation()
        
        collectionView!.collectionViewLayout.incomingAvatarViewSize = CGSize.zero
        collectionView!.collectionViewLayout.outgoingAvatarViewSize = CGSize.zero
    }
    
    func observeConversation () {
        messagesRef.observe(.childAdded, with: { (snapshot) -> Void in
            let conversationDict  = snapshot.value as! NSDictionary?
            let date              = conversationDict?["date"] as! Date
            let text              = conversationDict?["text"] as! String
            let message           = JSQMessage(senderId: self.senderId,
                                               senderDisplayName: self.senderDisplayName,
                                               date: date,
                                               text: text)

            self.messages.append(message!)
        })
    }
    
    
    func postMessage(context: String, itemID: String, otherUser: String, text: String, date: Date) {
        let messageID = ref.childByAutoId().key

        let formatter        = DateFormatter()
        formatter.dateFormat = "EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzz)"
        let convertedDate    = formatter.string(from: date)
        
        let contextDict    = ["conversationID": context,
                              "itemID": itemID,
                              "otherUser": otherUserID,
                              "latestPost": convertedDate]
        let messageDict    = ["date": convertedDate,
                              "message": text,
                              "type": "text",
                              "user": self.senderId]
        
        let messageUpdates = ["\(context)/context/": contextDict,
                              "\(context)/messages/\(messageID)": messageDict]
        
        chatRef.updateChildValues(messageUpdates)
    }
    
    func setupNavBar() {
        let deviceBounds  = UIScreen.main.bounds
        let width         = deviceBounds.size.width
        let navigationBar = UINavigationBar(frame: CGRect(x: 0, y: 0, width: width, height: 64))
        let navItem       = UINavigationItem(title: "Message \(self.otherUserName!)")
        let backItem      = UIBarButtonItem(barButtonSystemItem: .done,
                                            target: self,
                                            action: #selector(goBack))
        
        navItem.leftBarButtonItem = backItem
        navigationBar.setItems([navItem], animated: false)

        self.view.addSubview(navigationBar)
    }
    
    func goBack() {
        dismiss(animated: true, completion: nil)
    }
    
    func reloadMessagesView() {
        self.collectionView?.reloadData()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: JSQMessage overrides
    override func didPressSend(_ button: UIButton!, withMessageText text: String!, senderId: String!, senderDisplayName: String!, date: Date!) {
        print("YEAH")
        
        self.context = "AAA"
        
        postMessage(context: self.context, itemID: self.itemID, otherUser: self.otherUserID, text: text, date: date)
    }
    
    override func collectionView (_ collectionView: JSQMessagesCollectionView!, messageDataForItemAt indexPath: IndexPath!) -> JSQMessageData! {
        return messages[indexPath.item]
    }
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return messages.count
    }
    
    override func collectionView(_ collectionView: JSQMessagesCollectionView!, messageBubbleImageDataForItemAt indexPath: IndexPath!) -> JSQMessageBubbleImageDataSource! {
        let message = messages[indexPath.item]
        if message.senderId == senderId {
            return outgoingBubbleImageView
        } else {
            return incomingBubbleImageView
        }
    }
    
    override func collectionView(_ collectionView: JSQMessagesCollectionView!, avatarImageDataForItemAt indexPath: IndexPath!) -> JSQMessageAvatarImageDataSource! {
        return nil
    }
}
