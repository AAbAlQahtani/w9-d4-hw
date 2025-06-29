"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./utils/logger"));
const helpers_1 = require("./utils/helpers");
const dealer_routes_1 = __importDefault(require("./routes/dealer.routes"));
const carmake_routes_1 = __importDefault(require("./routes/carmake.routes"));
const car_routes_1 = __importDefault(require("./routes/car.routes"));
const http_status_1 = require("./utils/http-status");
const database_1 = require("./config/database");
// Load environment variables
dotenv_1.default.config();
// Optional: Delete all collections (use only in dev/testing)
if (helpers_1.dev) {
    (0, database_1.deleteAllCollections)();
}
// Connect to MongoDB
(0, database_1.connectDB)();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny', {
    stream: {
        write: (message) => logger_1.default.info(message.trim())
    }
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/dealers', dealer_routes_1.default);
app.use('/api/carmakes', carmake_routes_1.default);
app.use('/api/cars', car_routes_1.default);
// Basic route
app.get('/', (req, res) => {
    res.status(http_status_1.OK).json({ message: 'Car System API - Welcome!' });
});
// Error handler
app.use((err, req, res, next) => {
    logger_1.default.error('Error:', err.message);
    res.status(http_status_1.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Something went wrong!',
        error: helpers_1.dev ? err.message : undefined
    });
});
// Start server
app.listen(helpers_1.port, () => {
    logger_1.default.info(`Server is running on port ${helpers_1.port}`);
});
