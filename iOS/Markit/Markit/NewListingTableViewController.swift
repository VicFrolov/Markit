//
//  NewListingTableViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/25/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase

class NewListingTableViewController: UITableViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    let imagePicker: UIImagePickerController! = UIImagePickerController()
    var priceSelected       = false
    var titleSelected       = false
    var photoSelected       = false
    var tagSelected         = false
    var hubSelected         = false
    var descriptionSelected = false
    
    var databaseRef: FIRDatabaseReference!
    var tagRef:      FIRDatabaseReference!
    var tagList:     [String] = [String]()
    var hubList:     [String] = [String]()
    
    @IBOutlet weak var price: UIButton!
    @IBOutlet weak var itemImage: UIImageView!
    @IBOutlet weak var itemTitle: UIButton!
    @IBOutlet weak var itemDescription: UIButton!
    @IBOutlet weak var tags: UIButton!
    @IBOutlet weak var hubs: UIButton!
    @IBOutlet weak var postButton: UIButton!
    
    @IBAction func takePicture(sender: UIButton) {
        if (UIImagePickerController.isSourceTypeAvailable(.camera)) {
            if (UIImagePickerController.isCameraDeviceAvailable(.rear)) {
                imagePicker.sourceType = .camera
                imagePicker.cameraCaptureMode = .photo
                present(imagePicker, animated: true, completion: {})
            }
        } else {
            imagePicker.allowsEditing = true
            imagePicker.sourceType = .photoLibrary
            
            present(imagePicker, animated: true, completion: nil)
            photoSelected = true
        }
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        var selectedImageFromPicker: UIImage?
        
        if let editedImage = info[UIImagePickerControllerEditedImage] as? UIImage {
            selectedImageFromPicker = editedImage
        } else if let originalImage: UIImage = info[UIImagePickerControllerOriginalImage] as? UIImage {
            selectedImageFromPicker = originalImage
        }
        
        if let selectedImage = selectedImageFromPicker {
            itemImage.contentMode = .scaleAspectFill
            itemImage.image = selectedImage
            itemImage.layer.zPosition = 1
            photoSelected = true
            
            if (!priceSelected) {
                price.layer.zPosition = 2
            }
        }
        
        imagePicker.dismiss(animated: true, completion: {})
        
        if photoSelected && priceSelected {
            price.layer.zPosition = 2
            itemImage.layer.zPosition = 1
        }
    }
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        dismiss(animated: true, completion: nil)
    }
    
    func getTags () {
        tagRef.observe(.childAdded, with: { (snapshot) -> Void in
            if let tagValue = snapshot.value as! Int? {
                if tagValue > 7 {
                    self.tagList.append(snapshot.key.trim())
                }
            }
        })
    }
    
    @IBAction func unwindPrice(segue: UIStoryboardSegue) {
        let priceVC = segue.source as? AddPriceViewController
        var userPrice = (priceVC?.priceLabel.text)!
        
        if (userPrice != "...") {
            userPrice = "$" + userPrice;
            let blingedOutUserPrice = NSMutableAttributedString(string: userPrice as String)
            blingedOutUserPrice.addAttribute(NSForegroundColorAttributeName, value: UIColor(red: 255, green: 218, blue: 0, alpha: 0.7), range: NSRange(location:0,length:1))

            price.setAttributedTitle(blingedOutUserPrice, for: .normal)
            price.backgroundColor = UIColor(red: 100/255, green: 100/255, blue: 100/255, alpha: 0.5)
            priceSelected = true
        }
    }
    
    @IBAction func unwindAddTitle(segue: UIStoryboardSegue) {
        let titleVC = segue.source as? AddTitleViewController
        let userTitle = titleVC?.itemTitle.text!
        
        if userTitle != "" {
            itemTitle.setAttributedTitle(NSMutableAttributedString(string: userTitle! as String), for: .normal)
            titleSelected = true
        }
        print("it's running! and here's the title: \(userTitle!)")
    }
    
    @IBAction func unwindDescription(segue: UIStoryboardSegue) {
        let descVC = segue.source as? AddDescriptionViewController
        let userDescription = descVC?.itemDescription.text
        
        if userDescription != "" {
            itemDescription.setAttributedTitle(NSMutableAttributedString(string: userDescription! as String), for: .normal)
            descriptionSelected = true
        }
        print("description accepted: \(userDescription!)")
    }
    
    @IBAction func unwindTag(segue: UIStoryboardSegue) {
        let tagVC = segue.source as? AddTagsViewController
        let userTags = tagVC?.tagsField.text?.lowercased()
        
        if userTags != "" {
            tags.setAttributedTitle(NSMutableAttributedString(string: userTags! as String), for: .normal)
            tagSelected = true
        }
        print("tags accepted: \(userTags!)")
    }
    
    @IBAction func unwindAddHubs(segue: UIStoryboardSegue) {
        let hubVC = segue.source as? AddHubViewController
        let userHubs = hubVC?.hubsField.text
        
        if userHubs != "" {
            hubs.setAttributedTitle(NSMutableAttributedString(string: userHubs! as String), for: .normal)
            hubSelected = true
        }
        print("hubs accepted: \(userHubs!)")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        imagePicker.delegate = self
        
        postButton.isUserInteractionEnabled = false
        postButton.alpha = 0.1
        
        databaseRef = FIRDatabase.database().reference()
        tagRef      = databaseRef.child("tags")
        getTags()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        if priceSelected &&
            titleSelected &&
            photoSelected &&
            tagSelected &&
            hubSelected &&
            descriptionSelected {
            
            postButton.isUserInteractionEnabled = true
            postButton.alpha = 1.0
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "addTagSegue" {
            let addTagVC = segue.destination as! AddTagsViewController
            addTagVC.tagList = self.tagList
        } else if segue.identifier == "addHubSegue" {
            let addHubVC = segue.destination as! AddHubViewController
            addHubVC.hubList = self.hubList
        }
    }
    
    @IBAction func cancelToNewListings(segue: UIStoryboardSegue) {}

}
