//
//  NewListingTableViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/25/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class NewListingTableViewController: UITableViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    let imagePicker: UIImagePickerController! = UIImagePickerController()
    var priceSelected = false
    var titleSelected = false
    var photoSelected = false
    var tagSelected = false
    
    @IBOutlet weak var price: UIButton!
    @IBOutlet weak var itemImage: UIImageView!
    @IBOutlet weak var itemTitle: UIButton!
    @IBOutlet weak var itemDescription: UIButton!
    @IBOutlet weak var tags: UIButton!
    @IBOutlet weak var hubs: UIButton!
    
    @IBAction func takePicture(sender: UIButton) {
        if (UIImagePickerController.isSourceTypeAvailable(.camera)) {
            if (UIImagePickerController.isCameraDeviceAvailable(.rear)) {
                imagePicker.sourceType = .camera
                imagePicker.cameraCaptureMode = .photo
                present(imagePicker, animated: true, completion: {})
            }
        }
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        if let pickedImage: UIImage = info[UIImagePickerControllerOriginalImage] as? UIImage {
            itemImage.contentMode = .scaleAspectFill
            itemImage.image = pickedImage
            itemImage.layer.zPosition = 1
            photoSelected = true
            
            if (!priceSelected) {
                price.layer.zPosition = 2
            }
        }
        imagePicker.dismiss(animated: true, completion: {})
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
        }
    }
    
    @IBAction func unwindAddTitle(segue: UIStoryboardSegue) {
        let titleVC = segue.source as? AddTitleViewController
        let userTitle = titleVC?.itemTitle.text!
        
        if userTitle != "" {
            itemTitle.setAttributedTitle(NSMutableAttributedString(string: userTitle! as String), for: .normal)
        }
        print("it's running! and here's the title: \(userTitle!)")
    }
    
    @IBAction func unwindDescription(segue: UIStoryboardSegue) {
        let descVC = segue.source as? AddDescriptionViewController
        let userDescription = descVC?.itemDescription.text
        
        if userDescription != "" {
            itemDescription.setAttributedTitle(NSMutableAttributedString(string: userDescription! as String), for: .normal)
        }
        print("description accepted: \(userDescription!)")
    }
    
    @IBAction func unwindTag(segue: UIStoryboardSegue) {
        let tagVC = segue.source as? AddTagsViewController
        let userTags = tagVC?.tags.text
        
        if userTags != "" {
            tags.setAttributedTitle(NSMutableAttributedString(string: userTags! as String), for: .normal)
        }
        
        print("tags accepted: \(userTags!)")
    }
    
    @IBAction func unwindAddHubs(segue: UIStoryboardSegue) {
        let hubVC = segue.source as? AddHubViewController
        let userHubs = hubVC?.hubs.text
        print("hubs accepted: \(userHubs!)")

    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        imagePicker.delegate = self
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @IBAction func unwindBailTag(segue: UIStoryboardSegue) {
        
    }
    @IBAction func unwindBailPrice(segue: UIStoryboardSegue) {
        
    }
    @IBAction func unwindBailTitle(segue: UIStoryboardSegue) {
        
    }
    @IBAction func unwindBailDescription(segue: UIStoryboardSegue) {
        
    }

    
}
