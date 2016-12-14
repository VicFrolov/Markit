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
import PromiseKit

final class ChatMessageViewController: JSQMessagesViewController {
    
    var databaseRef:      FIRDatabaseReference!
    var userRef:          FIRDatabaseReference!
    var userChatRef:      FIRDatabaseReference!
    var otherUserChatRef: FIRDatabaseReference!
    var messagesRef:      FIRDatabaseReference!
    var storageRef:       FIRStorageReference!
    var imageRef:         FIRStorageReference!
    
    var itemID:           String!
    var otherUserID:      String!
    var otherUserName:    String!
    var context:          String!
    var itemImageURL:     String!
    var itemTitle:        String!
    var isInitialMessage: Bool = false
    
    var outgoingBubbleImageView = JSQMessagesBubbleImageFactory()
                                    .outgoingMessagesBubbleImage(with: UIColor(red: 0.169, green: 0.733, blue: 0.678, alpha: 1.0))
 
    var incomingBubbleImageView = JSQMessagesBubbleImageFactory()
                                    .incomingMessagesBubbleImage(with: UIColor.jsq_messageBubbleLightGray())
    var messages                = [JSQMessage]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupReferences()
        
        if self.context == nil {
            self.isInitialMessage = true
            self.context = self.userChatRef.childByAutoId().key
        } else {
            self.userChatRef.child("\(self.context!)/context/readMessages").setValue(true)
        }
        
        self.messagesRef = self.userChatRef.child(self.context!)
                                           .child("messages")
        
        getImageURL()
        setupNavBar()
        observeConversation()
        
        collectionView!.collectionViewLayout.incomingAvatarViewSize = CGSize.zero
        collectionView!.collectionViewLayout.outgoingAvatarViewSize = CGSize.zero
        
        self.topContentAdditionalInset = 64
    }
    
    func setupReferences() {
        self.databaseRef      = FIRDatabase.database().reference()
        self.storageRef       = FIRStorage.storage().reference()
        self.imageRef         = self.storageRef.child("images/itemImages/\(self.itemID!)/imageOne")
        self.userRef          = self.databaseRef.child("users")
        self.userChatRef      = self.userRef.child(self.senderId).child("chats")
        self.otherUserChatRef = self.userRef.child(self.otherUserID).child("chats")
        
        self.userRef.child(self.senderId)
            .child("username")
            .observeSingleEvent(of: .value, with: { (snapshot) -> Void in
                self.senderDisplayName = snapshot.value as! String
            })
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(true)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    func getImageURL () {
        imageRef.downloadURL { (url, error) in
            if error != nil {
                print("Something happened with the image: \(error?.localizedDescription)")
                return
            }
            self.itemImageURL = url?.absoluteString
            return
        }
    }
    
    func observeConversation () {
        messagesRef!.observe(.childAdded, with: { (snapshot) -> Void in
            let conversationDict  = snapshot.value as! NSDictionary?
            let stringDate        = conversationDict?["date"] as! String?
            let senderId          = conversationDict?["user"] as! String?
            
            // Need to replace this with getting username from database
            let senderDisplayName = conversationDict?["username"] as? String ?? senderId
            
            let date              = Date().parse(dateString: stringDate!)
            let text              = conversationDict?["text"] as! String
            let message           = JSQMessage(senderId: senderId!,
                                               senderDisplayName: senderDisplayName!,
                                               date: date,
                                               text: text)
            self.messages.append(message!)
            
            self.finishReceivingMessage()
        })
    }
    
    func getUsername(userID: String) -> Promise<String> {
        var username: String = ""
        userRef.child(userID).child("username").observeSingleEvent(of: .value, with: { (snapshot) -> Void in
            username = snapshot.value as! String
        })
        return Promise(value: username)
    }
    
    func postMessage(text: String, date: Date) {
        let messageID     = messagesRef.childByAutoId().key
        let convertedDate = date.toString()
        
        if isInitialMessage {
            initializeMessage(thisUserID: self.senderId, thisUserName: self.senderDisplayName, otherUserID: otherUserID, otherUserName: otherUserName, date: convertedDate, text: text, messageID: messageID)
            isInitialMessage = false
            return
        }
        
        let userContextDict  = ["latestPost": convertedDate]
        
        let messageDict      = ["date": convertedDate,
                                "text": text,
                                "type": "text",
                                "user": self.senderId!]
        
        let otherContextDict = ["latestPost": convertedDate,
                                "readMessages": false] as [String : Any]
        
        let childUpdates = ["\(self.senderId!)/chats/\(context!)/messages/\(messageID)": messageDict,
                            "\(self.otherUserID!)/chats/\(context!)/messages/\(messageID)": messageDict]
        
        userRef.updateChildValues(childUpdates)
        userChatRef.child(context!).child("context").updateChildValues(userContextDict)
        otherUserChatRef.child(context!).child("context").updateChildValues(otherContextDict)
    }
    
    func initializeMessage (thisUserID: String, thisUserName: String, otherUserID: String, otherUserName: String, date: String, text: String, messageID: String) {
        
        let userDict  = ["context":
                            ["conversationID": context,
                             "itemID": itemID,
                             "itemImageURL": itemImageURL,
                             "otherUser": otherUserID,
                             "otherUsername": otherUserName,
                             "latestPost": date,
                             "readMessages": true
                            ] as [String : Any],
                         "messages":
                            ["\(messageID)":
                                ["date": date,
                                 "text": text,
                                 "type": "text",
                                 "user": thisUserID]
                            ]
                        ]
        
        let otherDict = ["context":
                            ["conversationID": context,
                             "itemID": itemID,
                             "itemImageURL": itemImageURL,
                             "otherUser": thisUserID,
                             "otherUsername": thisUserName,
                             "latestPost": date,
                             "readMessages": false
                            ] as [String : Any],
                         "messages":
                            ["\(messageID)":
                                ["date": date,
                                 "text": text,
                                 "type": "text",
                                 "user": thisUserID]
                            ]
                        ]
        
        userChatRef.child(context!).updateChildValues(userDict)
        otherUserChatRef.child(context!).updateChildValues(otherDict)
    }
    
    func setupNavBar() {
        let deviceBounds  = UIScreen.main.bounds
        let width         = deviceBounds.size.width
        let navigationBar = UINavigationBar(frame: CGRect(x: 0, y: 0, width: width, height: 64))
        let navItem       = UINavigationItem(title: "\(self.otherUserName!)")
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
    
    // MARK: JSQMessage overrides
    override func didPressSend(_ button: UIButton!, withMessageText text: String!, senderId: String!, senderDisplayName: String!, date: Date!) {
        JSQSystemSoundPlayer.jsq_playMessageSentSound()
        
        postMessage(text: text, date: date)
        
        finishSendingMessage()
    }
    
    override func collectionView (_ collectionView: JSQMessagesCollectionView!, messageDataForItemAt indexPath: IndexPath!) -> JSQMessageData! {
        return messages[indexPath.item]
    }
    
//    override func collectionView(_ collectionView: JSQMessagesCollectionView!, attributedTextForCellTopLabelAt indexPath: IndexPath!) -> NSAttributedString! {
//        let message = messages[indexPath.item]
//        
//        
//    }
    
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

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let message = messages[indexPath.item]
        let customCell = super.collectionView(collectionView, cellForItemAt: indexPath) as! JSQMessagesCollectionViewCell
        
        if message.senderId != senderId {
            customCell.textView.textColor = UIColor.black
        }
        
        return customCell
    }
    
    override func collectionView(_ collectionView: JSQMessagesCollectionView!, avatarImageDataForItemAt indexPath: IndexPath!) -> JSQMessageAvatarImageDataSource! {
        return nil
    }
    
    override func collectionView(_ collectionView: JSQMessagesCollectionView!, didDeleteMessageAt indexPath: IndexPath!) {
        print("message deleted")
    }
}
