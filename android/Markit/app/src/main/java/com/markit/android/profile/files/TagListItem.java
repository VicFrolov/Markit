package com.markit.android.profile.files;

/**
 * Created by Mike on 12/12/16.
 */

public class TagListItem {
    private String itemName;
    private Object tags;

    public TagListItem(String itemName, Object tags) {
        this.itemName = itemName;
        this.tags = tags;
    }


    public String getItemName() {
        return this.itemName;
    }
    public String getTags() {
        String string = this.tags.toString();
        return string;
    }
    public void setItemName(String name) {
        this.itemName = name;
    }
    public void setTags(Object tags) {
        this.tags = tags;
    }

}
