const Sequelize = require('sequelize');
const StoryTypeModel = require('./story-type');
const StoryModel = require('./story');
const ChapterModel = require('./chapter');
const ChapterContentModel = require('./chapter-content'); 
const PurchasedChapterModel = require('./purchased-chapter');
const UserModel = require('./user');
const RateModel = require('./rate');
const FavoriteStoryModel = require('./favorite-story');
const ReadingHistoryModel = require('./reading-history');
const TransactionHistoryModel = require('./transaction-history');
const PaymentHistoryModel = require('./payment-history');
const CommentModel = require('./comment');
const UnlockModel = require('./unlock');
const RoleModel = require('./role');
const RoleDetailModel = require('./role-detail');

const sequelize = new Sequelize('ComicWebDB', 'sa', '123', {
    dialect: 'mssql',
    host: 'localhost',
    dialectOptions: {
        "options": {
            "instanceName": "SQLEXPRESS"
        }
    },
    pool: {
        max: 20,
        min: 0,
        acquire:30000,
        idle: 10000
    },
    logging: true
});

const StoryType = StoryTypeModel(sequelize, Sequelize);
const Story = StoryModel(sequelize, Sequelize);
const Chapter = ChapterModel(sequelize, Sequelize); 
const ChapterContent = ChapterContentModel(sequelize, Sequelize); 
const User = UserModel(sequelize, Sequelize);
const PurchasedChapter = PurchasedChapterModel(sequelize, Sequelize);
const Rate = RateModel(sequelize, Sequelize);
const FavoriteStory = FavoriteStoryModel(sequelize, Sequelize);
const ReadingHistory = ReadingHistoryModel(sequelize, Sequelize);
const TransactionHistory = TransactionHistoryModel(sequelize, Sequelize);
const PaymentHistory = PaymentHistoryModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const Unlock = UnlockModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const RoleDetail = RoleDetailModel(sequelize, Sequelize);

Story.belongsTo(StoryType, {foreignKey: 'typeid', as: 'storyType'});
StoryType.hasMany(Story, {foreignKey: 'typeid', as: 'stories'});

Chapter.belongsTo(Story, {foreignKey: 'storyid', as: 'story'});
Story.hasMany(Chapter, {foreignKey: 'storyid', as: 'chapters'});

ChapterContent.belongsTo(Chapter, {foreignKey: 'chapid', as: 'Chapters'});

Story.belongsTo(User, {foreignKey: 'userid', as: 'user'});
User.hasMany(Story, {foreignKey: 'userid', as: 'stories'});

PurchasedChapter.belongsTo(User, {foreignKey: 'userid', as: 'user'});
User.hasMany(PurchasedChapter, {foreignKey: 'userid', as: 'PurchasedChapter'});

PurchasedChapter.belongsTo(Chapter, {foreignKey: 'chapid', as: 'Chapters'});
Chapter.hasMany(PurchasedChapter, {foreignKey: 'chapid', as: 'PurchasedChapter'});

Rate.belongsTo(Story, {foreignKey: 'storyid', as: 'story'});
Story.hasMany(Rate, {foreignKey: 'storyid', as: 'rates'});

Rate.belongsTo(User, {foreignKey: 'userid', as: 'user'});
User.hasMany(Rate, {foreignKey: 'userid', as: 'rates'});

Story.belongsToMany(User, {through: FavoriteStory});
User.belongsToMany(Story, {through: FavoriteStory});

ReadingHistory.belongsTo(Chapter, {foreignKey:'chapid', as: 'chapter'});
Chapter.hasMany(ReadingHistory, {foreignKey: 'chapid', as: 'readingHistories'});

ReadingHistory.belongsTo(User, {foreignKey: 'userid', as: 'user'});
User.hasMany(ReadingHistory, {foreignKey: 'userid', as: 'readingHistories'});

Comment.belongsTo(Chapter, {foreignKey: 'chapid', as: 'chapter'});
Chapter.hasMany(Comment, {foreignKey: 'chapid', as: 'comments'});

Comment.belongsTo(User, {foreignKey: 'userid', as: 'user'});
User.hasMany(Comment, {foreignKey: 'userid', as: 'comments'});

Unlock.belongsTo(Chapter, {foreignKey: 'chapid', as: 'chapter'});
Chapter.hasMany(Unlock, {foreignKey: 'chapid', as: 'unlocks'});

Unlock.belongsTo(User, {foreignKey: 'userid', as: 'user'});
User.hasMany(Unlock, {foreignKey: 'userid', as: 'unlocks'});

TransactionHistory.belongsTo(User, {foreignKey: 'buyerid', as: 'buyer'});
// User.hasMany(TransactionHistory, {foreignKey: 'transactionHistories', as: 'transactionHistories'});
TransactionHistory.belongsTo(Chapter, {foreignKey: 'chapid', as: 'chapter'});

PaymentHistory.belongsTo(User, {foreignKey: 'userid', as: 'user'});
User.hasMany(PaymentHistory, {foreignKey: 'userid', as: 'paymentHistory'});

User.belongsToMany(Role, {through: RoleDetail});
Role.belongsToMany(User, {through: RoleDetail});

// sequelize.sync({ force: true }).then(() => {
//     console.log('Database & tables created!');
// });

module.exports = {
    StoryType,
    Story,
    Chapter,
    ChapterContent,
    User,
    PurchasedChapter,
    Rate,
    FavoriteStory,
    ReadingHistory,
    TransactionHistory,
    PaymentHistory,
    Comment,
    Unlock,
    Role,
    RoleDetail
}