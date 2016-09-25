//
//  NewListingTableViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/25/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class NewListingTableViewController: UITableViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    @IBOutlet weak var itemImage:UIImageView!
    let imagePicker: UIImagePickerController! = UIImagePickerController()
    
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
            itemImage.layer.zPosition = 1;
        }
        imagePicker.dismiss(animated: true, completion: {})
    }
    
    @IBAction func unwindPrice(segue: UIStoryboardSegue) {
        
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

