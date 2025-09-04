// Script to create sample blog data
const API_BASE_URL = 'http://localhost:4000/api';

async function createSampleData() {
  console.log('Creating sample blog data...');

  try {
    // Create categories
    console.log('Creating categories...');
    const categories = [
      { title: 'Grammar', slug: 'grammar' },
      { title: 'Business English', slug: 'business-english' },
      { title: 'Writing Skills', slug: 'writing-skills' },
      { title: 'Pronunciation', slug: 'pronunciation' }
    ];

    const createdCategories = [];
    for (const category of categories) {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(category),
        });
        
        if (response.ok) {
          const result = await response.json();
          createdCategories.push(result.doc);
          console.log(`✅ Created category: ${category.title}`);
        } else {
          console.log(`⚠️  Category ${category.title} might already exist`);
        }
      } catch (error) {
        console.log(`⚠️  Error creating category ${category.title}:`, error.message);
      }
    }

    // Create sample blog posts
    console.log('\nCreating blog posts...');
    const posts = [
      {
        title: 'Complete English Grammar Masterclass',
        slug: 'complete-english-grammar-masterclass',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Master all aspects of English grammar from basic to advanced levels. This comprehensive guide covers everything you need to know about English grammar.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'What You Will Learn'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'In this comprehensive guide, you will learn essential grammar rules, sentence structure, and common mistakes to avoid. Perfect for students, professionals, and anyone looking to improve their English skills.'
                  }
                ]
              }
            ]
          }
        },
        meta: {
          title: 'Complete English Grammar Masterclass',
          description: 'Master all aspects of English grammar from basic to advanced levels. Perfect for students, professionals, and anyone looking to improve their English skills.'
        },
        categories: createdCategories.slice(0, 1), // Grammar category
        _status: 'published'
      },
      {
        title: 'Business English Communication Skills',
        slug: 'business-english-communication-skills',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Learn professional English communication skills for the workplace. This guide covers business writing, presentations, meetings, and cross-cultural communication.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'Key Business Communication Skills'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Develop essential skills for effective workplace communication, including email writing, presentation techniques, and meeting participation.'
                  }
                ]
              }
            ]
          }
        },
        meta: {
          title: 'Business English Communication Skills',
          description: 'Learn professional English communication skills for the workplace, including business writing, presentations, and cross-cultural communication.'
        },
        categories: createdCategories.slice(1, 2), // Business English category
        _status: 'published'
      },
      {
        title: 'Advanced English Writing Techniques',
        slug: 'advanced-english-writing-techniques',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Enhance your writing skills with advanced techniques for essays, reports, creative writing, and academic papers. Take your writing to the next level.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'Writing Techniques Covered'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Learn advanced writing strategies, essay structure, creative writing techniques, and academic writing skills for professional and educational contexts.'
                  }
                ]
              }
            ]
          }
        },
        meta: {
          title: 'Advanced English Writing Techniques',
          description: 'Enhance your writing skills with advanced techniques for essays, reports, creative writing, and academic papers.'
        },
        categories: createdCategories.slice(2, 3), // Writing Skills category
        _status: 'published'
      }
    ];

    for (const post of posts) {
      try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(post),
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log(`✅ Created post: ${post.title}`);
        } else {
          const error = await response.json();
          console.log(`⚠️  Error creating post ${post.title}:`, error.errors?.[0]?.message || 'Unknown error');
        }
      } catch (error) {
        console.log(`❌ Error creating post ${post.title}:`, error.message);
      }
    }

    console.log('\n🎉 Sample blog data creation completed!');
    console.log('\nYou can now visit:');
    console.log('- Frontend Blog: http://localhost:3000/blogs');
    console.log('- Backend Admin: http://localhost:4000/admin');
    console.log('- API Posts: http://localhost:4000/api/posts');

  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  }
}

createSampleData();
