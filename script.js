// Interactive functionality for the study app dashboard

document.addEventListener('DOMContentLoaded', function() {
    initializeCheckboxes();
    initializeInteractivity();
    initializeCharts();
});

// Initialize goal checkboxes
function initializeCheckboxes() {
    const checkboxes = document.querySelectorAll('.goal-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const goalItem = this.closest('.goal-item');
            
            if (this.checked) {
                goalItem.classList.add('completed');
                // Show completion animation
                animateCompletion(goalItem);
            } else {
                goalItem.classList.remove('completed');
            }
            
            updateGoalProgress();
        });
    });
}

// Animate goal completion
function animateCompletion(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'slideIn 0.3s ease-out';
    }, 10);
}

// Update goal progress counter
function updateGoalProgress() {
    const totalGoals = document.querySelectorAll('.goal-item').length;
    const completedGoals = document.querySelectorAll('.goal-item.completed').length;
    const progressBadge = document.querySelector('.goal-progress');
    
    if (progressBadge) {
        progressBadge.textContent = `${completedGoals}/${totalGoals} Complete`;
    }
}

// Initialize interactive elements
function initializeInteractivity() {
    // Profile edit button
    const editProfileBtn = document.querySelector('.btn-secondary');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            alert('Edit Profile functionality would open a modal here.');
        });
    }
    
    // Recommendation buttons
    const recButtons = document.querySelectorAll('.btn-small');
    recButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.closest('.recommendation-item').querySelector('.rec-title').textContent;
            alert(`Starting: ${title}`);
        });
    });
    
    // Subject items hover effect
    const subjectItems = document.querySelectorAll('.subject-item');
    subjectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const fill = this.querySelector('.progress-fill');
            if (fill) {
                fill.style.transform = 'scaleX(1.05)';
                fill.style.transformOrigin = 'left';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const fill = this.querySelector('.progress-fill');
            if (fill) {
                fill.style.transform = 'scaleX(1)';
            }
        });
    });
    
    // Time filter dropdown
    const timeFilter = document.querySelector('.time-filter');
    if (timeFilter) {
        timeFilter.addEventListener('change', function() {
            updateChartData(this.value);
        });
    }
    
    // Achievement items
    const achievements = document.querySelectorAll('.achievement');
    achievements.forEach((achievement, index) => {
        achievement.addEventListener('mouseenter', function() {
            if (this.classList.contains('achieved')) {
                this.style.transform = 'translateY(-8px)';
            }
        });
        
        achievement.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Chart-related functions
function initializeCharts() {
    // Add smooth transitions to bars
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0';
        
        setTimeout(() => {
            bar.style.transition = 'height 0.6s ease-out';
            bar.style.height = height;
        }, index * 50);
    });
}

// Update chart based on time filter
function updateChartData(timeRange) {
    const chartData = {
        'This Week': [2.4, 3.0, 1.8, 3.4, 2.2, 3.6, 2.8],
        'Last Week': [2.0, 2.8, 3.2, 2.1, 3.8, 2.5, 2.9],
        'This Month': [2.2, 2.9, 3.1, 2.8, 3.0, 3.2, 2.7]
    };
    
    const data = chartData[timeRange] || chartData['This Week'];
    const bars = document.querySelectorAll('.bar');
    
    bars.forEach((bar, index) => {
        const newHeight = (data[index] / 4) * 100;
        bar.style.height = newHeight + '%';
        
        const valueSpan = bar.querySelector('.bar-value') || document.createElement('span');
        valueSpan.className = 'bar-value';
        valueSpan.textContent = data[index] + 'h';
        
        if (!bar.querySelector('.bar-value')) {
            bar.appendChild(valueSpan);
        }
    });
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + E to open edit profile
    if (e.altKey && e.key === 'e') {
        document.querySelector('.btn-secondary')?.click();
    }
    
    // Alt + S to focus on search (if search was available)
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        console.log('Search functionality would be activated here');
    }
});

// Simulate real-time updates
function startRealTimeUpdates() {
    setInterval(() => {
        // Update study time randomly (simulation)
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            // Slight variation to simulate activity
            const currentHeight = parseFloat(bar.style.height);
            const variation = (Math.random() - 0.5) * 5;
            const newHeight = Math.max(20, Math.min(100, currentHeight + variation));
            // Don't actually update to keep data consistent in demo
        });
    }, 5000);
}

// Progress bar animation
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.style.width = '0';
        
        setTimeout(() => {
            fill.style.transition = 'width 0.8s ease-out';
            fill.style.width = targetWidth;
        }, 100);
    });
}

// Call animation on load
setTimeout(animateProgressBars, 500);

// Streak day hover effects
function initializeStreakDays() {
    const days = document.querySelectorAll('.day');
    
    days.forEach((day, index) => {
        day.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'day-tooltip';
            tooltip.textContent = this.classList.contains('active') 
                ? `Day ${index + 1}: Active` 
                : `Day ${index + 1}: Break`;
            this.appendChild(tooltip);
        });
        
        day.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.day-tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// CSS for tooltip
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .day-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 10;
        margin-bottom: 4px;
    }
`;
document.head.appendChild(style);

initializeStreakDays();

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateGoalProgress,
        updateChartData,
        animateProgressBars
    };
}
