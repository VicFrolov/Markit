//
//  HubListingsPageViewController.swift
//  Markit
//
//  Created by Bryan Ku on 12/14/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class HubListingsPageViewController: UIPageViewController {
    
    weak var hubListingsDelegate: HubListingsPageViewControllerDelegate?
    
    private(set) lazy var orderedViewControllers: [UIViewController] = {
        return [self.newViewController(title: "itemOne"),
                self.newViewController(title: "itemTwo"),
                self.newViewController(title: "itemThree"),
                self.newViewController(title: "itemFour")]
    }()
    
    private func newViewController(title: String) -> UIViewController {
        return UIStoryboard(name: "Main", bundle: nil) .
            instantiateViewController(withIdentifier: "\(title)ViewController")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        dataSource = self
        delegate = self
        
        if let firstViewController = orderedViewControllers.first {
            setViewControllers([firstViewController],
                               direction: .forward,
                               animated: true,
                               completion: nil)
        }
        
        hubListingsDelegate?.hubListingsPageViewController(hubListingsPageViewController: self, didUpdatePageCount: orderedViewControllers.count)
    }
    
    
    
}

extension HubListingsPageViewController: UIPageViewControllerDataSource {
    
    func pageViewController(_ pageViewController: UIPageViewController,
                            viewControllerBefore viewController: UIViewController) -> UIViewController? {
        guard let viewControllerIndex = orderedViewControllers.index(of: viewController) else {
            return nil
        }
        
        let previousIndex = viewControllerIndex - 1
        
        guard previousIndex >= 0 else {
            return orderedViewControllers.last
        }
        
        guard orderedViewControllers.count > previousIndex else {
            return nil
        }
        
        return orderedViewControllers[previousIndex]
    }
    
    func pageViewController(_ pageViewController: UIPageViewController,
                            viewControllerAfter viewController: UIViewController) -> UIViewController? {
        guard let viewControllerIndex = orderedViewControllers.index(of: viewController) else {
            return nil
        }
        
        let nextIndex = viewControllerIndex + 1
        let orderedViewControllersCount = orderedViewControllers.count
        
        guard orderedViewControllersCount != nextIndex else {
            return orderedViewControllers.first
        }
        
        guard orderedViewControllersCount > nextIndex else {
            return nil
        }
        
        return orderedViewControllers[nextIndex]
    }
    
}

extension HubListingsPageViewController: UIPageViewControllerDelegate {
    
    func pageViewController(_ pageViewController: UIPageViewController,
                            didFinishAnimating finished: Bool,
                            previousViewControllers: [UIViewController],
                            transitionCompleted completed: Bool) {
        if let firstViewController = viewControllers?.first,
            let index = orderedViewControllers.index(of: firstViewController) {
            hubListingsDelegate?.hubListingsPageViewController(hubListingsPageViewController: self, didUpdatePageIndex: index)
        }
    }
    
}

protocol HubListingsPageViewControllerDelegate: class {
    
    /**
     Called when the number of pages is updated.
     
     - parameter tutorialPageViewController: the TutorialPageViewController instance
     - parameter count: the total number of pages.
     */
    func hubListingsPageViewController(hubListingsPageViewController: HubListingsPageViewController,
                                   didUpdatePageCount count: Int)
    
    /**
     Called when the current index is updated.
     
     - parameter tutorialPageViewController: the TutorialPageViewController instance
     - parameter index: the index of the currently visible page.
     */
    func hubListingsPageViewController(hubListingsPageViewController: HubListingsPageViewController,
                                   didUpdatePageIndex index: Int)
    
}
