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
    
    var databaseRef:   FIRDatabaseReference!
    var userRef:       FIRDatabaseReference!
    var chatRef:       FIRDatabaseReference!
    var messagesRef:   FIRDatabaseReference!
    var storageRef:    FIRStorageReference!
    var imageRef:      FIRStorageReference!
    
    var itemID:        String!
    var otherUserID:   String!
    var otherUserName: String!
    var context:       String!
    var itemImageURL:  String!
    
    var outgoingBubbleImageView = JSQMessagesBubbleImageFactory()
                                    .outgoingMessagesBubbleImage(with: UIColor.jsq_messageBubbleBlue())
    var incomingBubbleImageView = JSQMessagesBubbleImageFactory()
                                    .outgoingMessagesBubbleImage(with: UIColor.jsq_messageBubbleLightGray())
    var messages                = [JSQMessage]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.databaseRef = FIRDatabase.database().reference()
        self.storageRef  = FIRStorage.storage().reference()
        self.imageRef    = storageRef.child("images/itemImages/\(self.itemID!)/imageOne")
        self.userRef     = databaseRef.child("users")
                                      .child(self.otherUserID)
        self.chatRef     = userRef.child("chats")
        
        if self.context == nil {
            self.context = chatRef.childByAutoId().key
        }
        self.messagesRef = chatRef.child(self.context!)
                                  .child("messages")
        
        self.userRef.child("username").observeSingleEvent(of: .value, with: { (snapshot) -> Void in
            self.senderDisplayName = snapshot.value as! String
        })
        
        getImageURL()
        setupNavBar()
        observeConversation()
        
        collectionView!.collectionViewLayout.incomingAvatarViewSize = CGSize.zero
        collectionView!.collectionViewLayout.outgoingAvatarViewSize = CGSize.zero
        
        self.topContentAdditionalInset = 64
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
        messagesRef.observe(.childAdded, with: { (snapshot) -> Void in
            let conversationDict  = snapshot.value as! NSDictionary?
            let stringDate        = conversationDict?["date"] as! String?
            
            let dateFormatter     = DateFormatter()
            dateFormatter.dateFormat = "EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzz)"
            dateFormatter.timeZone = NSTimeZone(name: "UTC") as TimeZone!
            
            let date              = dateFormatter.date(from: stringDate!)
            let text              = conversationDict?["message"] as! String
            let message           = JSQMessage(senderId: self.senderId!,
                                               senderDisplayName: self.senderDisplayName!,
                                               date: date,
                                               text: text)

            self.messages.append(message!)
            self.finishReceivingMessage()
        })
    }
    
    func postMessage(text: String, date: Date) {
        let messageID = messageRef.childByAutoId().key

        let formatter        = DateFormatter()
        formatter.dateFormat = "EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzz)"
        let convertedDate    = formatter.string(from: date)
        
        let contextDict    = ["conversationID": context,
                              "itemID": itemID,
                              "itemImageURL": itemImageURL,
                              "otherUser": otherUserID,
                              "otherUserName": otherUserName,
                              "latestPost": convertedDate]
        let messageDict    = ["date": convertedDate,
                              "message": text,
                              "type": "text",
                              "user": self.senderId]
        
        let messageUpdates = ["\(context!)/context/": contextDict,
                              "\(context!)/messages/\(messageID)": messageDict]
        
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
    
    // MARK: JSQMessage overrides
    override func didPressSend(_ button: UIButton!, withMessageText text: String!, senderId: String!, senderDisplayName: String!, date: Date!) {
        JSQSystemSoundPlayer.jsq_playMessageSentSound()
        
        postMessage(text: text, date: date)
        
        finishSendingMessage()
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
    
    override func collectionView(_ collectionView: JSQMessagesCollectionView!, didDeleteMessageAt indexPath: IndexPath!) {
        print("message deleted")
    }
}
