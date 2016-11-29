//
//  ProfileViewController.swift
//  Markit
//
//  Created by Bryan Ku on 10/13/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import FirebaseAuth
import FirebaseDatabase

class ProfileViewController: UIViewController {
    @IBOutlet weak var star1: UIImageView!
    @IBOutlet weak var star5: UIImageView!
    @IBOutlet weak var star4: UIImageView!
    @IBOutlet weak var star3: UIImageView!
    @IBOutlet weak var star2: UIImageView!
    @IBOutlet weak var editButton: UIButton!
    @IBOutlet weak var pageControl: UIPageControl!
    @IBOutlet weak var profileBackGround: UIImageView!
    @IBOutlet weak var profilePicture: UIImageView!
    @IBOutlet weak var containerView: UIView!
    @IBOutlet weak var firstLastNameTextField: UILabel!
    @IBOutlet weak var usernameTextField: UILabel!
    @IBOutlet weak var emailTextField: UILabel!
    @IBOutlet weak var hubTextField: UILabel!
    var ref: FIRDatabaseReference!

    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let userID = FIRAuth.auth()?.currentUser?.uid
        ref = FIRDatabase.database().reference()

        profilePicture.layer.borderWidth = 3
        profilePicture.layer.masksToBounds = false
        profilePicture.layer.borderColor = UIColor.green.cgColor
        profilePicture.layer.cornerRadius = profilePicture.frame.height/2
        profilePicture.clipsToBounds = true
        
        editButton.backgroundColor = .clear
        editButton.layer.cornerRadius = 3
        editButton.layer.borderWidth = 1
        editButton.layer.borderColor = UIColor.white.cgColor
        
        ref.child("usernames").child(userID!).observeSingleEvent(of: .value, with: { (snapshot) in
            // Get user value
            let value = snapshot.value as? NSDictionary
            print("FDASFASF")
            print(value?["username"])
            let username = value?["username"] as? String ?? ""
            let firstName = value?["firstName"] as? String ?? ""
            let lastName = value?["lastName"] as? String ?? ""
            let name = "\(firstName) \(lastName)"
            let email = value?["email"] as? String ?? ""
            let hub = value?["hub"] as? String ?? ""
            
            self.firstLastNameTextField.text = name
            self.usernameTextField.text = username
            self.emailTextField.text = email
            self.hubTextField.text = hub
            
        }) { (error) in
            print(error.localizedDescription)
        }
        
        //makes navbar invisible with no text
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: .default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.isTranslucent = true
        self.navigationController?.view.backgroundColor = UIColor.clear
        self.navigationController?.navigationBar.tintColor = UIColor.white
        navigationItem.backBarButtonItem = UIBarButtonItem(title: "", style: .plain, target: nil, action: nil)

    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let profilePageViewController = segue.destination as? ProfilePageViewController {
            profilePageViewController.profileDelegate = self
        }
    }
    
}


extension ProfileViewController: ProfilePageViewControllerDelegate {
    
    internal func profilePageViewController(profilePageViewController: ProfilePageViewController,
                                    didUpdatePageCount count: Int) {
        pageControl.numberOfPages = count
    }
    
    internal func profilePageViewController(profilePageViewController: ProfilePageViewController,
                                    didUpdatePageIndex index: Int) {
        pageControl.currentPage = index
    }
    
}
