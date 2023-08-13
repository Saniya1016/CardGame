import {Score} from './database.js';

//create a user with an initial score of 0
export async function createUser(user_id){
    try {
      const newUser = new Score({
        _id: user_id,
        score: [0],
      });
      const savedUser = await newUser.save();
      console.log('User created successfully:', savedUser);
      return savedUser;
    } catch (error) {
      console.error('Failed to create room:', error);
      throw error;
    }
}

//read user details given the user id
export async function readUser(id){
    try {
      const user = await Score.findById(id);
      if (!user) {
        console.log('User not found');
        return null;
      }
      console.log('User found:', user);
      return user;
    } catch (error) {
      console.error('Failed to retrieve user:', error);
      throw error;
    }
}

export async function updateUser(id, score){
    const updates = {score: score};
    console.log(updates);
    try {
      const updatedUser = await Score.findByIdAndUpdate(id, updates, {
        new: true
      });
      if (!updatedUser) {
        console.log('User not found');
        return null;
      }
      console.log('User updated successfully:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
}

export async function deleteUser(id){
    try {
      const deletedUser = await Score.findByIdAndDelete(id);
      if (!deletedUser) {
        console.log('User not found');
        return null;
      }
      console.log('User deleted successfully:', deletedUser);
      return deletedUser;
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
}

export async function readAllUsers() {
    try {
      const users = await Score.find();
      console.log("users:", users);
      return users;
    } catch (error) {
      console.error('Failed to retrieve users:', error);
      throw error;
    }
  }


// ======== TESTING ==============//

// await createUser("trinity101");
// await updateUser("trinity101", [0,3, 78]);
// await readUser("trinity101");
// await deleteUser("trinity101");
// await readAllUsers();
