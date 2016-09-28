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
    @IBOutlet weak var itemImage:UIImageView!

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
        if let pickedImage:UIImage = info[UIImagePickerControllerOriginalImage] as? UIImage {
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
        let foo = segue.source as? AddPriceViewController
        let userPrice = (foo?.priceLabel.text)!
        
        if (userPrice != "...") {
            price.setTitle("$ " + userPrice, for: .normal)
            price.backgroundColor = UIColor(red: 100/255, green: 100/255, blue: 100/255, alpha: 0.5)
        }
    }
    
    @IBAction func unwindTitle(segue: UIStoryboardSegue) {
        
    }
    
    @IBAction func unwindDescription(segue: UIStoryboardSegue) {
        
    }
    
    @IBAction func unwindTag(segue: UIStoryboardSegue) {
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        imagePicker.delegate = self
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}

