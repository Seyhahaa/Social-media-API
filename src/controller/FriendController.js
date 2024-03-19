const User = require("../model/User");

const friendController = {
    addUnFriend: async (req, res)=>{
        try {
            const {current_user_id, friend_id} = req.body;
        const current_user = await User.findById(current_user_id);
        const friend = await User.findById(friend_id);

        if (current_user.friends.includes(friend_id)){
            current_user.friends = current_user.friends.filter(id=>id !== friend_id)
            friend.friends = friend.friends.filter(id=>id !== current_user)
        }else{
            current_user.friends.push(friend_id);
            friend.friends.push(current_user_id);
        }
        await current_user.save();
        await friend.save();
        return res.status(200).json(current_user)
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    },
    getAllorNotFriend: async (req, res)=>{
        try{
        const {id} = req.params;
        const user = await User.findById(id);
        const friends = [];

        await Promise.all(
            user.friends.map(async (friend_id)=>{
                const friend = await User.findById(friend_id);
                if(friend){
                    const formated = {
                        _id: friend.id,
                        username: friend.username,
                        profile_picture: friend.profile_picture
                    }
                    friends.push(formated);
                }
            })
        )
        const all_user = await User.find();
        
        const not_Friend = [];
        await Promise.all(
            all_user.map(async (single_user)=>{
                if(!user.friends.includes(single_user.id)){
                    const notFriend = await User.findById(single_user.id);
                    if(notFriend && single_user.id !== id ){
                        const formated = {
                            _id: notFriend.id,
                            username: notFriend.username,
                            profile_picture: notFriend.profile_picture
                        }
                        not_Friend.push(formated);
                    }
                }
            })
        )
        res.status(200).json({
            friends,
            not_Friend
        })
        }catch(err){
            return res.status(400).json(err.message)
        }
    }
}

module.exports = friendController;