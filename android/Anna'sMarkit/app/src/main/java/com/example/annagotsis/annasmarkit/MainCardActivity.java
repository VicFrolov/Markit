package com.example.annagotsis.annasmarkit;


import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.CardView;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import static android.content.ContentValues.TAG;

public class MainCardActivity extends AppCompatActivity {

    RecyclerView rv = (RecyclerView)findViewById(R.id.rv);
    rv.setHasFixedSize(true);
    LinearLayoutManager llm = new LinearLayoutManager(context);
    rv.setLayoutManager(llm);

    class Person {
        String name;
        String age;
        int photoId;

        Person(String name, String age, int photoId) {
            this.name = name;
            this.age = age;
            this.photoId = photoId;
        }
    }

    private List<Person> persons;

    // This method creates an ArrayList that has three Person objects
// Checkout the project associated with this tutorial on Github if
// you want to use the same images.
    private void initializeData(){
        persons = new ArrayList<>();
        persons.add(new Person("Emma Wilson", "23 years old", R.drawable.emma));
        persons.add(new Person("Lavery Maiss", "25 years old", R.drawable.lavery));
        persons.add(new Person("Lillie Watts", "35 years old", R.drawable.lillie));
    }

    public class RVAdapter extends RecyclerView.Adapter<RVAdapter.PersonViewHolder>{

        public static class PersonViewHolder extends RecyclerView.ViewHolder {
            CardView cv;
            TextView personName;
            TextView personAge;
            ImageView personPhoto;

            PersonViewHolder(View itemView) {
                super(itemView);
                cv = (CardView)itemView.findViewById(R.id.cv);
                personName = (TextView)itemView.findViewById(R.id.person_name);
                personAge = (TextView)itemView.findViewById(R.id.person_age);
                personPhoto = (ImageView)itemView.findViewById(R.id.person_photo);
            }
            List<Person> persons;

            RVAdapter(List<Person> persons){
                this.persons = persons;
            }
            @Override
            public int getItemCount() {
                return persons.size();
            }
            @Override
            public PersonViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
                View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.item, viewGroup, false);
                PersonViewHolder pvh = new PersonViewHolder(v);
                return pvh;
            }
            @Override
            public void onBindViewHolder(PersonViewHolder personViewHolder, int i) {
                personViewHolder.personName.setText(persons.get(i).name);
                personViewHolder.personAge.setText(persons.get(i).age);
                personViewHolder.personPhoto.setImageResource(persons.get(i).photoId);
            }
            @Override
            public void onAttachedToRecyclerView(RecyclerView recyclerView) {
                super.onAttachedToRecyclerView(recyclerView);
            }
            RVAdapter adapter = new RVAdapter(persons);
            rv.setAdapter(adapter);
        }



}
