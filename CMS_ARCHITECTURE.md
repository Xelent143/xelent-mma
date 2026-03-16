# Xelent MMA - AI Product CMS Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Admin Panel)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Product      │  │ Model        │  │ Generated Images     │  │
│  │ Upload Form  │  │ Selector     │  │ Gallery              │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP/REST
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND API (Node.js/Python)              │
│  ┌────────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ Product        │  │ Gemini 3.1   │  │ Image Processing   │  │
│  │ Controller     │──│ Image Pro    │──│ Pipeline           │  │
│  └────────────────┘  │ Integration  │  └────────────────────┘  │
│                      └──────────────┘                           │
│  ┌────────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ Database       │  │ Cloud        │  │ Queue System       │  │
│  │ (SQLite/       │  │ Storage      │  │ (Bull/Redis)       │  │
│  │  PostgreSQL)   │  │ (S3/Cloud)   │  │                    │  │
│  └────────────────┘  └──────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Core Features

### 1. Product Upload Flow
```
1. Admin uploads product image(s) → Cloud Storage
2. Select AI model (male/female, body type, ethnicity)
3. Enter product details (name, price, description)
4. System queues image generation job
5. Gemini 3.1 generates: Front, Back, Right, Close-up views
6. Results saved → Database + Storage
7. Auto-publish to frontend website
```

### 2. AI Image Generation Pipeline
```
Input: Product Image + Model Reference + Pose Type
       ↓
Gemini 3.1 Image Pro Processing
       ↓
Output: 4 E-commerce Ready Images
   - Front View (full body product showcase)
   - Back View (product from behind)
   - Right Side View (profile product display)
   - Close-up Detail (fabric, stitching, logo)
```

## Tech Stack Options

### Option A: Node.js + Express (Recommended)
- **Frontend**: React/Vue.js admin panel
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (products) + Redis (job queue)
- **Storage**: AWS S3 or Cloudflare R2
- **AI**: Google Gemini 3.1 Image Pro API
- **Queue**: Bull (Redis-based)

### Option B: Python + FastAPI
- **Frontend**: React admin panel
- **Backend**: Python FastAPI
- **Database**: PostgreSQL
- **Storage**: AWS S3
- **AI**: Google Gemini 3.1 via Python SDK
- **Queue**: Celery + Redis

### Option C: Serverless (Vercel + Supabase)
- **Frontend**: Next.js
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **AI**: Google Gemini API
- **Queue**: Inngest or QStash

---

## Implementation Guide - Option A (Node.js)

### Step 1: Project Structure
```
xelent-cms/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── storage.js
│   │   │   └── gemini.js
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   └── imageGenerationController.js
│   │   ├── models/
│   │   │   └── Product.js
│   │   ├── routes/
│   │   │   ├── products.js
│   │   │   └── images.js
│   │   ├── services/
│   │   │   ├── geminiService.js
│   │   │   ├── imageProcessor.js
│   │   │   └── queueService.js
│   │   └── app.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductUpload/
│   │   │   ├── ModelSelector/
│   │   │   └── ImageGallery/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Generate.jsx
│   │   └── App.jsx
│   └── package.json
└── docker-compose.yml
```

### Step 2: Environment Variables (.env)
```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/xelent_cms

# Google Gemini API
GEMINI_API_KEY=your_gemini_3.1_api_key
GEMINI_MODEL=gemini-3.1-image-pro

# Cloud Storage (AWS S3 or Cloudflare R2)
STORAGE_PROVIDER=s3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=xelent-product-images

# Or Cloudflare R2
# R2_ACCOUNT_ID=your_account_id
# R2_ACCESS_KEY_ID=your_access_key
# R2_SECRET_ACCESS_KEY=your_secret_key
# R2_BUCKET_NAME=xelent-products

# Redis (for job queue)
REDIS_URL=redis://localhost:6379

# JWT Secret for Auth
JWT_SECRET=your_super_secret_jwt_key
PORT=3001
```

### Step 3: Database Schema

```sql
-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    status VARCHAR(20) DEFAULT 'draft', -- draft, generating, published, archived
    original_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Models Table (preset models for virtual try-on)
CREATE TABLE ai_models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL, -- male, female
    ethnicity VARCHAR(50),
    body_type VARCHAR(50),
    reference_image_url TEXT,
    prompt_template TEXT,
    is_active BOOLEAN DEFAULT true
);

-- Generated Images Table
CREATE TABLE generated_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    model_id INTEGER REFERENCES ai_models(id),
    view_type VARCHAR(20) NOT NULL, -- front, back, right, closeup
    image_url TEXT NOT NULL,
    prompt_used TEXT,
    generation_status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed, failed
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Generation Jobs Queue Table
CREATE TABLE generation_jobs (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    model_id INTEGER REFERENCES ai_models(id),
    status VARCHAR(20) DEFAULT 'queued', -- queued, processing, completed, failed
    progress INTEGER DEFAULT 0, -- 0-100
    result_images JSONB,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP
);

-- Insert Default AI Models
INSERT INTO ai_models (name, type, ethnicity, body_type, prompt_template) VALUES
('Ahmad - Athletic Male', 'male', 'South Asian', 'Athletic', 
 'Professional MMA fighter, athletic build, South Asian male, wearing {product}, studio lighting, white background, {pose} view, high detail, photorealistic'),
('Sarah - Fit Female', 'female', 'Middle Eastern', 'Fit',
 'Professional female fighter, fit build, Middle Eastern, wearing {product}, studio lighting, white background, {pose} view, high detail, photorealistic'),
('James - Muscular Male', 'male', 'Caucasian', 'Muscular',
 'Professional athlete, muscular build, wearing {product}, studio lighting, white background, {pose} view, high detail, photorealistic');
```

### Step 4: Gemini 3.1 Integration Service

```javascript
// backend/src/services/geminiService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
const path = require('path');

class GeminiService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL || 'gemini-3.1-image-pro',
        });
    }

    /**
     * Generate virtual try-on images for a product
     * @param {Object} params
     * @param {string} params.productImagePath - Path to product image
     * @param {Object} params.model - AI model configuration
     * @param {string} params.viewType - front, back, right, closeup
     * @param {Object} params.product - Product details
     */
    async generateProductImage({ productImagePath, model, viewType, product }) {
        try {
            // Read product image
            const imageBuffer = await fs.readFile(productImagePath);
            const base64Image = imageBuffer.toString('base64');

            // Build prompt based on view type
            const prompt = this.buildPrompt({ model, viewType, product });

            // Prepare image part
            const imagePart = {
                inlineData: {
                    data: base64Image,
                    mimeType: 'image/jpeg',
                },
            };

            // Generate image
            const result = await this.model.generateContent({
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: prompt },
                            imagePart,
                        ],
                    },
                ],
                generationConfig: {
                    temperature: 0.4,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 4096,
                },
            });

            const response = await result.response;
            
            // Extract generated image (if returned as base64)
            // Note: Actual implementation depends on Gemini 3.1 response format
            const generatedImage = this.extractImageFromResponse(response);
            
            return {
                success: true,
                imageData: generatedImage,
                prompt: prompt,
            };
        } catch (error) {
            console.error('Gemini generation error:', error);
            throw error;
        }
    }

    /**
     * Build generation prompt based on view type
     */
    buildPrompt({ model, viewType, product }) {
        const viewDescriptions = {
            front: 'front view, full body, facing camera directly, product clearly visible from front',
            back: 'back view, full body, facing away from camera, product clearly visible from behind',
            right: 'right side view, full body profile, facing left, product clearly visible from side',
            closeup: 'close-up detail shot, focus on product fabric texture, stitching, and logo placement, shallow depth of field'
        };

        const basePrompt = model.prompt_template
            .replace('{product}', product.name)
            .replace('{pose}', viewDescriptions[viewType]);

        // Add e-commerce specific requirements
        return `${basePrompt}

E-commerce requirements:
- Clean white or light gray studio background
- Professional product photography lighting
- Sharp focus on product details
- No text or watermarks
- High resolution, suitable for web display
- Color accurate representation
- Model pose: neutral, professional athletic stance
- Composition: centered, rule of thirds for visual appeal`;
    }

    /**
     * Batch generate all views for a product
     */
    async generateAllViews({ productImagePath, model, product }) {
        const views = ['front', 'back', 'right', 'closeup'];
        const results = [];

        for (const viewType of views) {
            try {
                const result = await this.generateProductImage({
                    productImagePath,
                    model,
                    viewType,
                    product,
                });
                
                results.push({
                    viewType,
                    status: 'completed',
                    ...result,
                });
            } catch (error) {
                results.push({
                    viewType,
                    status: 'failed',
                    error: error.message,
                });
            }
        }

        return results;
    }

    extractImageFromResponse(response) {
        // Implementation depends on actual Gemini 3.1 response structure
        // This is a placeholder - adjust based on actual API response
        if (response.candidates && response.candidates[0]) {
            const parts = response.candidates[0].content.parts;
            for (const part of parts) {
                if (part.inlineData) {
                    return part.inlineData.data;
                }
            }
        }
        throw new Error('No image found in response');
    }
}

module.exports = GeminiService;
```

### Step 5: Product Controller

```javascript
// backend/src/controllers/productController.js
const Product = require('../models/Product');
const GenerationJob = require('../models/GenerationJob');
const queueService = require('../services/queueService');
const storageService = require('../services/storageService');

class ProductController {
    /**
     * Upload new product and queue image generation
     */
    async createProduct(req, res) {
        try {
            const { name, description, price, category, modelId } = req.body;
            
            // Upload original product image to cloud storage
            const uploadedImage = await storageService.uploadFile(
                req.file,
                `products/originals/${Date.now()}_${req.file.originalname}`
            );

            // Create product record
            const product = await Product.create({
                name,
                slug: this.generateSlug(name),
                description,
                price,
                category,
                original_image_url: uploadedImage.url,
                status: 'generating',
            });

            // Create generation job
            const job = await GenerationJob.create({
                product_id: product.id,
                model_id: modelId,
                status: 'queued',
                progress: 0,
            });

            // Queue image generation task
            await queueService.addImageGenerationJob({
                jobId: job.id,
                productId: product.id,
                modelId: modelId,
                imageUrl: uploadedImage.url,
            });

            res.status(201).json({
                success: true,
                data: {
                    product,
                    jobId: job.id,
                },
                message: 'Product uploaded and image generation queued',
            });
        } catch (error) {
            console.error('Create product error:', error);
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }

    /**
     * Get all products with generated images
     */
    async getProducts(req, res) {
        try {
            const { status, category, page = 1, limit = 20 } = req.query;
            
            const where = {};
            if (status) where.status = status;
            if (category) where.category = category;

            const products = await Product.findAndCountAll({
                where,
                include: [
                    {
                        model: GeneratedImage,
                        as: 'images',
                        required: false,
                    },
                ],
                order: [['created_at', 'DESC']],
                limit: parseInt(limit),
                offset: (parseInt(page) - 1) * parseInt(limit),
            });

            res.json({
                success: true,
                data: products.rows,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: products.count,
                    totalPages: Math.ceil(products.count / parseInt(limit)),
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }

    /**
     * Get single product with all generated images
     */
    async getProduct(req, res) {
        try {
            const { id } = req.params;
            
            const product = await Product.findByPk(id, {
                include: [
                    {
                        model: GeneratedImage,
                        as: 'images',
                        include: [{ model: AIModel, as: 'model' }],
                    },
                    {
                        model: GenerationJob,
                        as: 'jobs',
                        order: [['created_at', 'DESC']],
                        limit: 1,
                    },
                ],
            });

            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Product not found',
                });
            }

            res.json({
                success: true,
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }

    /**
     * Regenerate images for a product
     */
    async regenerateImages(req, res) {
        try {
            const { id } = req.params;
            const { modelId } = req.body;

            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Product not found',
                });
            }

            // Update status
            await product.update({ status: 'generating' });

            // Create new generation job
            const job = await GenerationJob.create({
                product_id: product.id,
                model_id: modelId,
                status: 'queued',
                progress: 0,
            });

            // Queue regeneration
            await queueService.addImageGenerationJob({
                jobId: job.id,
                productId: product.id,
                modelId: modelId,
                imageUrl: product.original_image_url,
                isRegeneration: true,
            });

            res.json({
                success: true,
                data: { jobId: job.id },
                message: 'Image regeneration queued',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }

    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '-' + Date.now();
    }
}

module.exports = new ProductController();
```

### Step 6: Image Generation Queue Worker

```javascript
// backend/src/workers/imageGenerationWorker.js
const GeminiService = require('../services/geminiService');
const StorageService = require('../services/storageService');
const Product = require('../models/Product');
const GeneratedImage = require('../models/GeneratedImage');
const GenerationJob = require('../models/GenerationJob');
const AIModel = require('../models/AIModel');

class ImageGenerationWorker {
    constructor() {
        this.geminiService = new GeminiService();
        this.storageService = new StorageService();
    }

    /**
     * Process image generation job
     */
    async processJob(jobData) {
        const { jobId, productId, modelId, imageUrl } = jobData;
        
        try {
            // Update job status
            await GenerationJob.update(
                { status: 'processing', started_at: new Date() },
                { where: { id: jobId } }
            );

            // Get product and model details
            const [product, model] = await Promise.all([
                Product.findByPk(productId),
                AIModel.findByPk(modelId),
            ]);

            if (!product || !model) {
                throw new Error('Product or model not found');
            }

            // Download original image temporarily
            const tempImagePath = await this.downloadImage(imageUrl);

            // Generate all 4 views
            const views = ['front', 'back', 'right', 'closeup'];
            const results = [];

            for (let i = 0; i < views.length; i++) {
                const viewType = views[i];
                
                // Update progress
                const progress = Math.round(((i) / views.length) * 100);
                await GenerationJob.update(
                    { progress },
                    { where: { id: jobId } }
                );

                try {
                    // Generate image with Gemini
                    const generationResult = await this.geminiService.generateProductImage({
                        productImagePath: tempImagePath,
                        model: model,
                        viewType: viewType,
                        product: product,
                    });

                    // Upload generated image to cloud storage
                    const uploadedImage = await this.storageService.uploadBuffer(
                        Buffer.from(generationResult.imageData, 'base64'),
                        `products/generated/${productId}/${viewType}_${Date.now()}.jpg`,
                        'image/jpeg'
                    );

                    // Save to database
                    const generatedImage = await GeneratedImage.create({
                        product_id: productId,
                        model_id: modelId,
                        view_type: viewType,
                        image_url: uploadedImage.url,
                        prompt_used: generationResult.prompt,
                        generation_status: 'completed',
                    });

                    results.push({
                        viewType,
                        status: 'completed',
                        imageId: generatedImage.id,
                        url: uploadedImage.url,
                    });
                } catch (error) {
                    console.error(`Failed to generate ${viewType} view:`, error);
                    
                    await GeneratedImage.create({
                        product_id: productId,
                        model_id: modelId,
                        view_type: viewType,
                        generation_status: 'failed',
                        error_message: error.message,
                    });

                    results.push({
                        viewType,
                        status: 'failed',
                        error: error.message,
                    });
                }
            }

            // Clean up temp file
            await this.cleanupTempFile(tempImagePath);

            // Update job as completed
            await GenerationJob.update(
                {
                    status: 'completed',
                    progress: 100,
                    completed_at: new Date(),
                    result_images: JSON.stringify(results),
                },
                { where: { id: jobId } }
            );

            // Update product status
            const hasSuccessfulImages = results.some(r => r.status === 'completed');
            await Product.update(
                { status: hasSuccessfulImages ? 'published' : 'failed' },
                { where: { id: productId } }
            );

            return { success: true, results };
        } catch (error) {
            console.error('Job processing error:', error);
            
            await GenerationJob.update(
                {
                    status: 'failed',
                    error_message: error.message,
                    completed_at: new Date(),
                },
                { where: { id: jobId } }
            );

            await Product.update(
                { status: 'failed' },
                { where: { id: productId } }
            );

            throw error;
        }
    }

    async downloadImage(url) {
        const axios = require('axios');
        const fs = require('fs').promises;
        const path = require('path');
        const os = require('os');

        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const tempPath = path.join(os.tmpdir(), `product_${Date.now()}.jpg`);
        await fs.writeFile(tempPath, response.data);
        
        return tempPath;
    }

    async cleanupTempFile(path) {
        try {
            const fs = require('fs').promises;
            await fs.unlink(path);
        } catch (error) {
            console.error('Failed to cleanup temp file:', error);
        }
    }
}

module.exports = ImageGenerationWorker;
```

### Step 7: Queue Service (Bull + Redis)

```javascript
// backend/src/services/queueService.js
const Queue = require('bull');
const ImageGenerationWorker = require('../workers/imageGenerationWorker');

// Create queues
const imageGenerationQueue = new Queue('image-generation', process.env.REDIS_URL);

// Initialize worker
const worker = new ImageGenerationWorker();

// Process jobs
imageGenerationQueue.process(async (job) => {
    console.log('Processing job:', job.id);
    return await worker.processJob(job.data);
});

// Event handlers
imageGenerationQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed:`, result);
});

imageGenerationQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
});

class QueueService {
    async addImageGenerationJob(data) {
        const job = await imageGenerationQueue.add(data, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 5000,
            },
            removeOnComplete: 100,
            removeOnFail: 50,
        });
        
        return job.id;
    }

    async getJobStatus(jobId) {
        const job = await imageGenerationQueue.getJob(jobId);
        if (!job) return null;
        
        return {
            id: job.id,
            state: await job.getState(),
            progress: job.progress(),
            data: job.data,
            result: job.returnvalue,
            failedReason: job.failedReason,
        };
    }
}

module.exports = new QueueService();
```

### Step 8: Frontend Admin Panel - Product Upload Component

```jsx
// frontend/src/components/ProductUpload/ProductUploadForm.jsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import ModelSelector from '../ModelSelector/ModelSelector';
import GenerationProgress from '../GenerationProgress/GenerationProgress';
import './ProductUploadForm.css';

const ProductUploadForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'bjj-gi',
        modelId: '',
    });
    const [uploadedFile, setUploadedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [generationJob, setGenerationJob] = useState(null);
    const [error, setError] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setUploadedFile(file);
            setPreview(URL.createObjectURL(file));
            setError(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
        },
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024, // 10MB
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!uploadedFile) {
            setError('Please upload a product image');
            return;
        }
        
        if (!formData.modelId) {
            setError('Please select an AI model');
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const data = new FormData();
            data.append('image', uploadedFile);
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('category', formData.category);
            data.append('modelId', formData.modelId);

            const response = await axios.post('/api/products', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(progress);
                },
            });

            setGenerationJob(response.data.data.jobId);
        } catch (err) {
            setError(err.response?.data?.error || 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="product-upload-container">
            <h2>Upload New Product</h2>
            
            {generationJob ? (
                <GenerationProgress jobId={generationJob} />
            ) : (
                <form onSubmit={handleSubmit} className="upload-form">
                    {/* Image Upload Dropzone */}
                    <div
                        {...getRootProps()}
                        className={`dropzone ${isDragActive ? 'active' : ''} ${preview ? 'has-preview' : ''}`}
                    >
                        <input {...getInputProps()} />
                        
                        {preview ? (
                            <div className="preview-container">
                                <img src={preview} alt="Preview" />
                                <button
                                    type="button"
                                    className="change-image-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setUploadedFile(null);
                                        setPreview(null);
                                    }}
                                >
                                    Change Image
                                </button>
                            </div>
                        ) : (
                            <div className="dropzone-content">
                                <div className="upload-icon">📸</div>
                                <p>Drag & drop product image here</p>
                                <span>or click to select</span>
                                <small>Supports: JPG, PNG, WEBP (max 10MB)</small>
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="form-fields">
                        <div className="form-group">
                            <label>Product Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g., Elite Pro Gi"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Price (USD) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="149.00"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="bjj-gi">BJJ Gi</option>
                                    <option value="rashguard">Rashguard</option>
                                    <option value="fight-shorts">Fight Shorts</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Product description..."
                                rows={3}
                            />
                        </div>

                        {/* AI Model Selection */}
                        <ModelSelector
                            selectedModel={formData.modelId}
                            onSelect={(modelId) => setFormData(prev => ({ ...prev, modelId }))}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="upload-btn"
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <>
                                <span className="spinner"></span>
                                Uploading... {uploadProgress}%
                            </>
                        ) : (
                            <>
                                <span>🚀</span>
                                Upload & Generate Images
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProductUploadForm;
```

### Step 9: Generation Progress Component

```jsx
// frontend/src/components/GenerationProgress/GenerationProgress.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GenerationProgress.css';

const viewLabels = {
    front: 'Front View',
    back: 'Back View',
    right: 'Side View',
    closeup: 'Detail Shot',
};

const GenerationProgress = ({ jobId }) => {
    const [jobStatus, setJobStatus] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await axios.get(`/api/generation-jobs/${jobId}`);
                const data = response.data.data;
                
                setJobStatus(data);
                
                if (data.result_images) {
                    setImages(data.result_images);
                }

                // Continue polling if job is still processing
                if (data.status === 'queued' || data.status === 'processing') {
                    setTimeout(checkStatus, 2000);
                }
            } catch (error) {
                console.error('Failed to check status:', error);
            }
        };

        checkStatus();
    }, [jobId]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return '✅';
            case 'failed': return '❌';
            case 'processing': return '⏳';
            default: return '⏸️';
        }
    };

    if (!jobStatus) {
        return <div className="loading">Loading status...</div>;
    }

    return (
        <div className="generation-progress">
            <h3>🎨 Generating Product Images</h3>
            
            <div className="progress-overview">
                <div className="progress-bar-container">
                    <div 
                        className="progress-bar"
                        style={{ width: `${jobStatus.progress}%` }}
                    />
                </div>
                <span className="progress-text">{jobStatus.progress}% Complete</span>
            </div>

            <div className="status-badge" data-status={jobStatus.status}>
                {getStatusIcon(jobStatus.status)} 
                {jobStatus.status === 'queued' && 'In Queue'}
                {jobStatus.status === 'processing' && 'Generating Images...'}
                {jobStatus.status === 'completed' && 'All Images Generated!'}
                {jobStatus.status === 'failed' && 'Generation Failed'}
            </div>

            {images.length > 0 && (
                <div className="generated-images">
                    <h4>Generated Images</h4>
                    <div className="images-grid">
                        {images.map((img, index) => (
                            <div 
                                key={index}
                                className={`image-card ${img.status}`}
                            >
                                {img.status === 'completed' ? (
                                    <>
                                        <img src={img.url} alt={img.viewType} />
                                        <span className="view-label">
                                            {viewLabels[img.viewType]}
                                        </span>
                                    </>
                                ) : (
                                    <div className="image-placeholder">
                                        <span>{getStatusIcon(img.status)}</span>
                                        <span>{viewLabels[img.viewType]}</span>
                                        {img.error && (
                                            <small className="error">{img.error}</small>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {jobStatus.status === 'completed' && (
                <div className="actions">
                    <button className="btn-primary" onClick={() => window.location.reload()}>
                        Upload Another Product
                    </button>
                    <a href="/products" className="btn-secondary">
                        View All Products
                    </a>
                </div>
            )}
        </div>
    );
};

export default GenerationProgress;
```

### Step 10: Model Selector Component

```jsx
// frontend/src/components/ModelSelector/ModelSelector.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ModelSelector.css';

const ModelSelector = ({ selectedModel, onSelect }) => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        try {
            const response = await axios.get('/api/ai-models');
            setModels(response.data.data);
        } catch (error) {
            console.error('Failed to fetch models:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading models...</div>;

    return (
        <div className="model-selector">
            <label>Select AI Model *</label>
            <p className="helper-text">
                Choose a virtual model for the product photoshoot
            </p>
            
            <div className="models-grid">
                {models.map((model) => (
                    <div
                        key={model.id}
                        className={`model-card ${selectedModel === model.id ? 'selected' : ''}`}
                        onClick={() => onSelect(model.id)}
                    >
                        <div className="model-avatar">
                            {model.type === 'male' ? '👨' : '👩'}
                        </div>
                        <div className="model-info">
                            <h4>{model.name}</h4>
                            <span className="model-tag">{model.body_type}</span>
                            <span className="model-tag">{model.ethnicity}</span>
                        </div>
                        {selectedModel === model.id && (
                            <div className="selected-indicator">✓</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModelSelector;
```

---

## API Routes

```javascript
// backend/src/routes/index.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');

// Products
router.post('/products', upload.single('image'), productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.post('/products/:id/regenerate', productController.regenerateImages);

// AI Models
router.get('/ai-models', async (req, res) => {
    const models = await AIModel.findAll({ where: { is_active: true } });
    res.json({ success: true, data: models });
});

// Generation Jobs
router.get('/generation-jobs/:id', async (req, res) => {
    const job = await GenerationJob.findByPk(req.params.id, {
        include: [GeneratedImage],
    });
    if (!job) {
        return res.status(404).json({ success: false, error: 'Job not found' });
    }
    res.json({ success: true, data: job });
});

module.exports = router;
```

---

## Deployment Options

### Option 1: Self-Hosted (VPS)
```bash
# Docker Compose setup
docker-compose up -d

# Services:
# - Node.js API (port 3001)
# - PostgreSQL (port 5432)
# - Redis (port 6379)
# - React Frontend (port 3000)
```

### Option 2: Cloud Deployment
- **Backend**: Railway, Render, or Fly.io
- **Database**: Supabase or Railway PostgreSQL
- **Storage**: Cloudflare R2 (cheaper than S3)
- **Frontend**: Vercel or Netlify
- **Queue**: Upstash Redis

### Option 3: Serverless (Low Cost)
- **API**: Vercel Serverless Functions
- **Database**: Supabase
- **Storage**: Supabase Storage
- **Queue**: Inngest or QStash
- **AI**: Google Gemini API direct from frontend (with API key protection)

---

## Cost Estimation (Monthly)

| Component | Option A (VPS) | Option B (Cloud) | Option C (Serverless) |
|-----------|---------------|------------------|----------------------|
| Server | $20-40 | $10-20 | $0-5 |
| Database | Included | $5-15 | $0-5 |
| Storage | $5-10 | $5-10 | $5-10 |
| Redis | Included | $5-10 | $0-5 |
| Gemini API | ~$0.02/image | ~$0.02/image | ~$0.02/image |
| **Total** | **$25-50** | **$25-55** | **$10-30** |

*Gemini 3.1 Image Pro: ~$0.02 per image generated = $0.08 per product (4 views)*

---

## Next Steps

1. **Set up Google Cloud Project** and enable Gemini 3.1 Image Pro API
2. **Choose deployment option** based on budget/scale
3. **Set up database** and run migrations
4. **Configure cloud storage** (S3/R2)
5. **Deploy backend** and test API endpoints
6. **Deploy frontend** admin panel
7. **Upload first product** and test generation flow

Want me to implement any specific part of this system?