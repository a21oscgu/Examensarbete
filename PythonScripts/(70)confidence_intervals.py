import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from scipy.stats import t

def exampleBarChars():
    # Read your data from file
    file = "combined_data_for_pilotstudie_histogram.json"
    df = pd.read_json(file, orient='records')

    # Define your grouping categories
    groups = ["100JSON(70)", "100XML(70)"]

    # Width of the bars
    barWidth = 0.3

    # Initialize lists to store bar data and error intervals for each group
    barsData = []
    barsInterval = []

    # Confidence level (e.g., 95%)
    confidence_level = 0.95

    # Degrees of freedom
    degrees_of_freedom = len(df) - 1

    # Iterate over groups and calculate mean and confidence interval for each group
    for group in groups:
        group_data = df[group]
        mean = group_data.mean() / 1000  # Convert from ms to seconds
        std_error = group_data.sem() / 1000  # Convert from ms to seconds
        interval = t.ppf((1 + confidence_level) / 2, degrees_of_freedom) * std_error
        barsData.append(mean)
        barsInterval.append(interval)

    # The x-position order of bars
    barsOrder = np.arange(len(groups))

    # Colors of bar charts
    colors = ["#fA00ff", "#6fff79"]

    # Opacity of colors
    Opacity = 1

    # Interval cap size
    intervalCapsize = 7

    # Plot bars for each group
    for i in range(len(groups)):
        plt.bar(barsOrder[i], barsData[i], color=colors[i], edgecolor='black',
                width=barWidth, yerr=barsInterval[i], capsize=intervalCapsize,
                alpha=Opacity, label=groups[i])

    # Put a tick on the x-axis under each pair of bars and label it with data size
    plt.xticks(barsOrder, groups)
    plt.ylabel('Average load time (seconds)')  # Change ylabel to seconds
    plt.xlabel('Number of articles')
    plt.title('Measurements when using 100 articles')
    plt.legend()

    # Set the y-axis limit
    plt.ylim(0, 1)  # Adjusted for seconds

    plt.show()

exampleBarChars()