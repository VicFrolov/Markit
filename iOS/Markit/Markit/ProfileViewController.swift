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
    @IBOutlet var collectionOfStars: Array<UIImageView>?
    @IBOutlet weak var editButton: UIButton!
    @IBOutlet weak var logOutButton: UIButton!
    @IBOutlet weak var notificationsButton: UIButton!
    @IBOutlet weak var pageControl: UIPageControl!
    @IBOutlet weak var profileBackGround: UIImageView!
    @IBOutlet weak var profilePicture: UIImageView!
    @IBOutlet weak var containerView: UIView!
    @IBOutlet weak var firstLastNameLabel: UILabel!
    @IBOutlet weak var usernameLabel: UILabel!
    @IBOutlet weak var emailLabel: UILabel!
    @IBOutlet weak var hubLabel: UILabel!
    @IBOutlet weak var noRatingLabel: UILabel!
    @IBOutlet weak var otherPaymentLabel: UILabel!
    @IBOutlet weak var venmoPaymentLabel: UILabel!
    @IBOutlet weak var cashPaymentLabel: UILabel!
    var ref: FIRDatabaseReference!
    var firstName = "", lastName = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        drawButtonWhiteBorder(button: editButton)
        drawButtonWhiteBorder(button: logOutButton)
        
        for star in collectionOfStars! {
            star.isHidden = true
        }
        self.pageControl.currentPageIndicatorTintColor = UIColor.red
        self.pageControl.pageIndicatorTintColor = UIColor.black
        definesPresentationContext = true
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "segueToEditProfile" {
            if let destination = segue.destination as? EditProfileViewController {
                destination.firstName = self.firstName
                destination.lastName  = self.lastName
                destination.email     = self.emailLabel.text!
                destination.username  = self.usernameLabel.text!
                destination.hub       = self.hubLabel.text!
            }
        }
        if let profilePageViewController = segue.destination as? ProfilePageViewController {
            profilePageViewController.profileDelegate = self
        }
    }
    
    @IBAction func unwindEditProfile(segue: UIStoryboardSegue) {
        
    }
    
    @IBAction func unwindNotifications(segue: UIStoryboardSegue) {
        
    }
    
    @IBAction func logOut(sender: UIButton) {
        try! FIRAuth.auth()!.signOut()
        self.dismiss(animated: false, completion: {
            self.performSegue(withIdentifier: "segueBackToLogin", sender: self)
        })
    }
    
    
    override func viewDidLayoutSubviews() {
        makeProfilePicCircular()
        updateProfile()
    }
    
    func makeProfilePicCircular() {
        profilePicture.layer.borderWidth = 3
        profilePicture.layer.masksToBounds = false
        profilePicture.layer.borderColor = UIColor.clear.cgColor
        profilePicture.layer.cornerRadius = profilePicture.frame.height/2
        profilePicture.clipsToBounds = true
    }
    
    func drawButtonWhiteBorder(button: UIButton) {
        button.backgroundColor = .clear
        button.layer.cornerRadius = 3
        button.layer.borderWidth = 1
        button.layer.borderColor = UIColor.white.cgColor
    }
    
    func updateProfile() {
        ref = FIRDatabase.database().reference()
        let userID = FIRAuth.auth()?.currentUser?.uid
        ref.child("users").child(userID!).child("paymentPreference").observeSingleEvent(of: .value, with: { (snapshot) in
            print("APPLE \(paymentPreference)")
        }) { (error) in
            print(error.localizedDescription)
        }
        ref.child("users").child(userID!).observeSingleEvent(of: .value, with: { (snapshot) in
            // Get user value
            let value = snapshot.value as? NSDictionary
            let username = value?["username"] as? String ?? ""
            self.firstName = value?["firstName"] as? String ?? ""
            self.lastName = value?["lastName"] as? String ?? ""
            let name = "\(self.firstName) \(self.lastName)"
            let email = value?["email"] as? String ?? ""
            let hub = value?["userHub"] as? String ?? ""
            let rating = value?["rating"] as? String ?? "none"
            let stars = Int(rating)! - 1
            
            self.firstLastNameLabel.text = name
            self.usernameLabel.text = username
            self.emailLabel.text = email
            self.hubLabel.text = hub
            
            if (rating != "none" && stars <= 4) {
                for i in 0...stars {
                    self.collectionOfStars![i].isHidden = false
                }
                self.noRatingLabel.isHidden = true
            } else {
                self.noRatingLabel.isHidden = false
            }
            
        }) { (error) in
            print(error.localizedDescription)
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
